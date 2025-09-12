import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Photos from './pages/Photos'
import Albums from './pages/Albums'
import Letters from './pages/Letters'
import Music from './pages/Music'
import Games from './pages/Games'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fotos" element={<Photos />} />
            <Route path="/albuns" element={<Albums />} />
            <Route path="/cartas" element={<Letters />} />
            <Route path="/musicas" element={<Music />} />
            <Route path="/jogos" element={<Games />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App