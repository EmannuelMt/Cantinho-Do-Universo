const mongoose = require('mongoose');
const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class BackupService {
  constructor() {
    this.backupDir = path.join(__dirname, '../../backups');
    
    // Criar diretório de backups se não existir
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  async criarBackup() {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupFile = path.join(this.backupDir, `backup-${timestamp}.gz`);
      
      // Usar mongodump para criar backup
      const uri = process.env.MONGODB_URI;
      const command = `mongodump --uri="${uri}" --archive="${backupFile}" --gzip`;
      
      await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            reject(error);
          } else {
            resolve(stdout);
          }
        });
      });

      console.log(`Backup criado: ${backupFile}`);
      
      // Manter apenas os últimos 7 backups
      this.limparBackupsAntigos();
      
      return backupFile;
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      throw error;
    }
  }

  limparBackupsAntigos() {
    fs.readdir(this.backupDir, (err, files) => {
      if (err) return;
      
      const backupFiles = files
        .filter(file => file.startsWith('backup-') && file.endsWith('.gz'))
        .map(file => ({
          name: file,
          time: fs.statSync(path.join(this.backupDir, file)).mtime.getTime()
        }))
        .sort((a, b) => b.time - a.time);
      
      // Manter apenas os últimos 7 backups
      if (backupFiles.length > 7) {
        const filesToDelete = backupFiles.slice(7);
        filesToDelete.forEach(file => {
          fs.unlinkSync(path.join(this.backupDir, file.name));
          console.log(`Backup antigo removido: ${file.name}`);
        });
      }
    });
  }

  iniciarBackupAutomatico() {
    // Executar backup diariamente às 2h da manhã
    cron.schedule('0 2 * * *', async () => {
      try {
        console.log('Iniciando backup automático...');
        await this.criarBackup();
        console.log('Backup automático concluído');
      } catch (error) {
        console.error('Erro no backup automático:', error);
      }
    });

    console.log('Backup automático agendado para rodar diariamente às 2h');
  }
}

module.exports = new BackupService();