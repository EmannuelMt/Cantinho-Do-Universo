import { useState, useRef, useEffect } from 'react';
import './LetterEditor.css';

const EditorDeCarta = () => {
  const [carta, setCarta] = useState('');
  const [tamanhoFonte, setTamanhoFonte] = useState(16);
  const [fonte, setFonte] = useState('Arial');
  const [tema, setTema] = useState('light');
  const [negrito, setNegrito] = useState(false);
  const [italico, setItalico] = useState(false);
  const [alinhamento, setAlinhamento] = useState('left');
  const [espacamentoLinha, setEspacamentoLinha] = useState(1.5);
  const textareaRef = useRef(null);

  // Aplicar formatação
  const aplicarFormatacao = (tipo) => {
    const textarea = textareaRef.current;
    const inicio = textarea.selectionStart;
    const fim = textarea.selectionEnd;
    const textoSelecionado = carta.substring(inicio, fim);
    let novoTexto = carta;

    switch(tipo) {
      case 'negrito':
        novoTexto = carta.substring(0, inicio) + `**${textoSelecionado}**` + carta.substring(fim);
        break;
      case 'italico':
        novoTexto = carta.substring(0, inicio) + `_${textoSelecionado}_` + carta.substring(fim);
        break;
      case 'titulo':
        novoTexto = carta.substring(0, inicio) + `\n## ${textoSelecionado}\n` + carta.substring(fim);
        break;
      default:
        break;
    }

    setCarta(novoTexto);
    setTimeout(() => {
      textarea.setSelectionRange(inicio + 2, fim + 2);
      textarea.focus();
    }, 0);
  };

  // Contadores
  const contadorPalavras = carta.trim() ? carta.trim().split(/\s+/).length : 0;
  const contadorCaracteres = carta.length;
  const tempoLeitura = Math.ceil(contadorPalavras / 200);

  // Auto-salvar no localStorage
  useEffect(() => {
    const cartaSalva = localStorage.getItem('cartaSalva');
    if (cartaSalva) {
      setCarta(cartaSalva);
    }
  }, []);

  useEffect(() => {
    if (carta) {
      localStorage.setItem('cartaSalva', carta);
    }
  }, [carta]);

  return (
    <div className={`editor-carta ${tema}`}>
      <div className="cabecalho-editor">
        <h1>Editor de Carta Profissional</h1>
        <div className="alternador-tema">
          <button 
            onClick={() => setTema(tema === 'light' ? 'dark' : 'light')}
            className="botao-tema"
            aria-label="Alternar tema"
          >
            {tema === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
          </button>
        </div>
      </div>

      <div className="barra-ferramentas">
        <div className="grupo-ferramentas">
          <button 
            onClick={() => { aplicarFormatacao('negrito'); setNegrito(!negrito); }} 
            className={`botao-ferramenta ${negrito ? 'ativo' : ''}`}
            aria-label="Negrito"
          >
            <span className="icone">N</span>
          </button>
          <button 
            onClick={() => { aplicarFormatacao('italico'); setItalico(!italico); }} 
            className={`botao-ferramenta ${italico ? 'ativo' : ''}`}
            aria-label="Itálico"
          >
            <span className="icone">I</span>
          </button>
        </div>

        <div className="grupo-ferramentas">
          <button 
            onClick={() => setAlinhamento('left')} 
            className={`botao-ferramenta ${alinhamento === 'left' ? 'ativo' : ''}`}
            aria-label="Alinhar à esquerda"
          >
            <span className="icone">⎸</span>
          </button>
          <button 
            onClick={() => setAlinhamento('center')} 
            className={`botao-ferramenta ${alinhamento === 'center' ? 'ativo' : ''}`}
            aria-label="Centralizar"
          >
            <span className="icone">⎹</span>
          </button>
          <button 
            onClick={() => setAlinhamento('right')} 
            className={`botao-ferramenta ${alinhamento === 'right' ? 'ativo' : ''}`}
            aria-label="Alinhar à direita"
          >
            <span className="icone">⎹</span>
          </button>
        </div>

        <div className="grupo-ferramentas">
          <label htmlFor="fonteFamilia" className="somente-tela">Família de fonte</label>
          <select
            id="fonteFamilia"
            value={fonte}
            onChange={(e) => setFonte(e.target.value)}
            className="seletor-fonte"
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>

          <label htmlFor="tamanhoFonte" className="somente-tela">Tamanho da fonte</label>
          <select
            id="tamanhoFonte"
            value={tamanhoFonte}
            onChange={(e) => setTamanhoFonte(parseInt(e.target.value))}
            className="seletor-fonte"
          >
            {[12, 14, 16, 18, 20, 22, 24].map(tamanho => (
              <option key={tamanho} value={tamanho}>{tamanho}px</option>
            ))}
          </select>

          <label htmlFor="espacamentoLinha" className="somente-tela">Espaçamento</label>
          <select
            id="espacamentoLinha"
            value={espacamentoLinha}
            onChange={(e) => setEspacamentoLinha(parseFloat(e.target.value))}
            className="seletor-fonte"
          >
            <option value="1.0">1.0</option>
            <option value="1.25">1.25</option>
            <option value="1.5">1.5</option>
            <option value="1.75">1.75</option>
            <option value="2.0">2.0</option>
          </select>
        </div>
      </div>

      <div className="container-editor">
        <textarea
          ref={textareaRef}
          value={carta}
          onChange={(e) => setCarta(e.target.value)}
          placeholder="Digite sua carta profissional aqui..."
          className="area-texto"
          style={{
            fontSize: `${tamanhoFonte}px`,
            fontFamily: fonte,
            textAlign: alinhamento,
            lineHeight: espacamentoLinha,
            fontWeight: negrito ? 'bold' : 'normal',
            fontStyle: italico ? 'italic' : 'normal'
          }}
          spellCheck="true"
        />
      </div>

      <div className="rodape-editor">
        <div className="estatisticas-documento">
          <div className="item-estatistica">
            <span className="rotulo-estatistica">Palavras</span>
            <span className="valor-estatistica">{contadorPalavras}</span>
          </div>
          <div className="item-estatistica">
            <span className="rotulo-estatistica">Caracteres</span>
            <span className="valor-estatistica">{contadorCaracteres}</span>
          </div>
          <div className="item-estatistica">
            <span className="rotulo-estatistica">Tempo de leitura</span>
            <span className="valor-estatistica">{tempoLeitura} min</span>
          </div>
        </div>

        <div className="botoes-acao">
          <button className="botao-secundario" onClick={() => setCarta('')}>
            Limpar documento
          </button>
          <button className="botao-primario">
            Exportar como PDF
          </button>
        </div>
      </div>

      <div className="secao-previa">
        <h2 className="titulo-previa">Pré-visualização da Carta</h2>
        <div 
          className="conteudo-previa"
          style={{
            fontSize: `${tamanhoFonte}px`,
            fontFamily: fonte,
            textAlign: alinhamento,
            lineHeight: espacamentoLinha,
            fontWeight: negrito ? 'bold' : 'normal',
            fontStyle: italico ? 'italic' : 'normal'
          }}
        >
          {carta || <div className="placeholder-previa">Sua carta formatada aparecerá aqui...</div>}
        </div>
      </div>
    </div>
  );
};

export default EditorDeCarta;