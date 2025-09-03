import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, Heart } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Por favor, preencha todos os campos');
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Pequeno delay para mostrar a animação
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError(result.message);
        setIsSubmitting(false);
        setLoading(false);
      }
    } catch (error) {
      setError('Falha ao fazer login. Verifique suas credenciais.');
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await loginWithGoogle();
      
      if (result.success) {
        setIsSubmitting(true);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError(result.message);
        setLoading(false);
      }
    } catch (error) {
      setError('Falha ao fazer login com Google');
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isSubmitting ? 'auth-success' : ''}`}>
        <div className="auth-header">
          <div className="auth-logo">
            <Heart size={48} className={`logo-icon ${isSubmitting ? 'logo-pulse' : ''}`} />
            <h1>Bem-vindo de volta</h1>
          </div>
          <p>Entre no seu cantinho especial 💖</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <div className="input-group">
            <div className="input-icon">
              <Mail size={20} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Seu email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-icon">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Sua senha"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
              disabled={loading}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={`auth-button ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Entrando...
              </>
            ) : (
              'Entrar no nosso cantinho'
            )}
          </button>
        </form>

        <div className="auth-divider">
          <span>ou</span>
        </div>

        <button 
          className="google-auth-button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          type="button"
        >
          <FcGoogle size={20} />
          Entrar com Google
        </button>

        <div className="auth-footer">
          <p className="auth-link-text">
            Não tem uma conta?{' '}
            <Link to="/register" className="auth-link">
              Criar conta
            </Link>
          </p>
          
          <p className="auth-welcome-text">
            💝 Bem-vindo ao lugar onde nossos momentos ficam eternizados
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;