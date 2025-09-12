import { useState } from 'react'
import './Letters.css'

const Letters = () => {
  const [letters, setLetters] = useState([
    { id: 1, title: "Para o amor da minha vida", date: "12/05/2023", excerpt: "Hoje acordei pensando em você..." },
    { id: 2, title: "Nossa primeira viagem", date: "28/07/2023", excerpt: "Lembra daquela vez na praia?" },
    { id: 3, title: "Obrigado por tudo", date: "03/09/2023", excerpt: "Queria te agradecer por ser tão incrível..." },
  ])
  
  const [showForm, setShowForm] = useState(false)
  const [newLetter, setNewLetter] = useState({ title: '', content: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const letter = {
      id: letters.length + 1,
      title: newLetter.title,
      date: new Date().toLocaleDateString('pt-BR'),
      excerpt: newLetter.content.substring(0, 50) + '...'
    }
    setLetters([...letters, letter])
    setNewLetter({ title: '', content: '' })
    setShowForm(false)
  }

  return (
    <div className="letters">
      <h1 className="section-title">Nossas Cartas</h1>
      
      <div className="letters-list">
        {letters.map(letter => (
          <div key={letter.id} className="letter-item">
            <h3>{letter.title}</h3>
            <p className="letter-date">{letter.date}</p>
            <p className="letter-excerpt">{letter.excerpt}</p>
            <button className="btn">Ler carta</button>
          </div>
        ))}
      </div>
      
      {showForm ? (
        <div className="letter-form">
          <h3>Escrever nova carta</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              placeholder="Título" 
              value={newLetter.title}
              onChange={(e) => setNewLetter({...newLetter, title: e.target.value})}
              required 
            />
            <textarea 
              placeholder="Escreva sua carta aqui..." 
              rows="5"
              value={newLetter.content}
              onChange={(e) => setNewLetter({...newLetter, content: e.target.value})}
              required 
            ></textarea>
            <div className="form-actions">
              <button type="submit" className="btn">Salvar</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="create-letter">
          <button className="btn" onClick={() => setShowForm(true)}>Escrever Nova Carta</button>
        </div>
      )}
    </div>
  )
}

export default Letters