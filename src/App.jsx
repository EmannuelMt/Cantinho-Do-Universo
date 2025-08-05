import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/global/Navbar';
import Footer from './components/global/Footer';
import Home from './pages/Home';
import Moments from './pages/Moments';
import Letters from './pages/Letters';
import Games from './pages/Games';  
import Playlist from './pages/Playlist';
import Settings from './pages/Settings';
import EasterEgg from './pages/EasterEgg';


function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="app">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/momentos" element={<Moments />} />
                <Route path="/cartas" element={<Letters />} />
                <Route path="/jogos" element={<Games />} />
                <Route path="/musicas" element={<Playlist />} />
                <Route path="/configuracoes" element={<Settings />} />
                <Route path="/surpresa-secreta" element={<EasterEgg />} />
              </Routes>
            </AnimatePresence>
            <Footer />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;