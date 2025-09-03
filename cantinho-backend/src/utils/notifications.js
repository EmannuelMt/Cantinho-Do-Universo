const User = require('../models/User');
const Carta = require('../models/Carta');

class NotificacaoService {
  constructor() {
    this.notificacoesPendentes = [];
  }

  // Adicionar notificação para processamento em lote
  adicionarNotificacao(usuarioId, tipo, mensagem, dados = {}) {
    this.notificacoesPendentes.push({
      usuarioId,
      tipo,
      mensagem,
      dados,
      timestamp: new Date()
    });
  }

  // Processar notificações em lote
  async processarNotificacoes() {
    if (this.notificacoesPendentes.length === 0) return;

    const notificacoes = [...this.notificacoesPendentes];
    this.notificacoesPendentes = [];

    for (const notificacao of notificacoes) {
      try {
        // Aqui você implementaria o envio real (email, push notification, etc.)
        console.log('Notificação:', notificacao);
        
        // Simular envio
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error('Erro ao enviar notificação:', error);
      }
    }
  }

  // Verificar cartas agendadas
  async verificarCartasAgendadas() {
    try {
      const agora = new Date();
      const cartas = await Carta.find({
        dataAgendada: { $lte: agora },
        aberta: false
      }).populate('destinatario');

      for (const carta of cartas) {
        this.adicionarNotificacao(
          carta.destinatario._id,
          'carta_agendada',
          'Você recebeu uma carta especial!',
          { cartaId: carta._id }
        );
      }
    } catch (error) {
      console.error('Erro ao verificar cartas agendadas:', error);
    }
  }

  // Verificar datas especiais
  async verificarDatasEspeciais() {
    try {
      const hoje = new Date();
      const usuarios = await User.find({
        dataAniversario: {
          $not: { $eq: null }
        }
      });

      for (const usuario of usuarios) {
        const aniversario = new Date(usuario.dataAniversario);
        if (aniversario.getDate() === hoje.getDate() && 
            aniversario.getMonth() === hoje.getMonth()) {
          
          // Notificar o parceiro
          if (usuario.parceiroId) {
            this.adicionarNotificacao(
              usuario.parceiroId,
              'aniversario_parceiro',
              `Hoje é aniversário do(a) ${usuario.nome}!`,
              { usuarioId: usuario._id }
            );
          }
        }
      }
    } catch (error) {
      console.error('Erro ao verificar datas especiais:', error);
    }
  }
}

module.exports = new NotificacaoService();