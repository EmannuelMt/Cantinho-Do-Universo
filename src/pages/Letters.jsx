import LetterEditor from '../components/LetterEditor'; // Sem {}
import './Letters.css';

const Letters = () => {
  return (
    <div className="letters-page">
      <h1>Nossas Cartas de Amor</h1>
      <LetterEditor />
    </div>
  );
};

export default Letters;