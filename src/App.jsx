import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Perfil from './pages/Perfil';
import Momentos from './pages/Momentos';
import Album from './pages/Album';
import Musicas from './pages/Musicas';
import Cartas from './pages/Cartas';
import Jogos from './pages/Jogos';
import LoadingSpinner from './components/UI/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="fullpage-loading">
        <LoadingSpinner />
        <p>Carregando...</p>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="fullpage-loading">
        <LoadingSpinner />
        <p>Carregando...</p>
      </div>
    );
  }
  
  return !user ? children : <Navigate to="/" />;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="app">
      {/* Header e Navigation só aparecem quando usuário está logado */}
      {user && (
        <>
          <Header />
          <div className="app-layout">
            <Navigation />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/momentos" element={<Momentos />} />
                <Route path="/album" element={<Album />} />
                <Route path="/musicas" element={<Musicas />} />
                <Route path="/cartas" element={<Cartas />} />
                <Route path="/jogos" element={<Jogos />} />
              </Routes>
            </main>
          </div>
        </>
      )}
      
      {/* Rotas públicas (login/register) */}
      {!user && (
        <main className="auth-content">
          <Routes>
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;