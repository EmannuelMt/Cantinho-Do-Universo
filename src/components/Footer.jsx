import './Footer.css'

const Footer = () => {
  // Data de início do relacionamento (exemplo: 1º de Janeiro de 2023)
  const startDate = new Date('2023-01-01')
  const today = new Date()
  const diffTime = Math.abs(today - startDate)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>❤️ Nosso amor dura {diffDays} dias e continua crescendo...</p>
        <p>© {new Date().getFullYear()} - Cantinho do Universo</p>
      </div>
    </footer>
  )
}

export default Footer