const cron = require('node-cron');
const NotificacaoService = require('./notifications');
const Carta = require('../models/Carta');

class Agendador {
  iniciar() {
    // Executar a cada minuto para verificar cartas agendadas
    cron.schedule('* * * * *', async () => {
      try {
        await NotificacaoService.verificarCartasAgendadas();
        await NotificacaoService.processarNotificacoes();
      } catch (error) {
        console.error('Erro no agendador:', error);
      }
    });

    // Executar diariamente às 8h para verificar datas especiais
    cron.schedule('0 8 * * *', async () => {
      try {
        await NotificacaoService.verificarDatasEspeciais();
        await NotificacaoService.processarNotificacoes();
      } catch (error) {
        console.error('Erro no agendador diário:', error);
      }
    });

    // Limpar cartas antigas mensalmente (manter apenas últimos 6 meses)
    cron.schedule('0 0 1 * *', async () => {
      try {
        const seisMesesAtras = new Date();
        seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);
        
        await Carta.deleteMany({
          dataEnvio: { $lt: seisMesesAtras },
          aberta: true,
          favorita: false
        });
        
        console.log('Limpeza de cartas antigas concluída');
      } catch (error) {
        console.error('Erro na limpeza de cartas:', error);
      }
    });

    console.log('Agendador iniciado com sucesso');
  }
}

module.exports = new Agendador();