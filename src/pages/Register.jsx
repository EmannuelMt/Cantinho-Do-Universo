import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Heart } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, signInWithGoogle } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      setIsSubmitting(false);
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      await register(userData);
      // Pequeno delay para mostrar a animação
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setError('Falha ao criar conta. Tente novamente.');
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
      setIsSubmitting(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setError('Falha ao fazer registro com Google');
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isSubmitting ? 'auth-success' : ''}`}>
        <div className="auth-header">
          <div className="auth-logo">
            <Heart size={48} className={`logo-icon ${isSubmitting ? 'logo-pulse' : ''}`} />
            <h1>Criar Conta</h1>
          </div>
          <p>Junte-se ao nosso cantinho especial 💖</p>
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
              <User size={20} />
            </div>
            <input
              type="text"
              name="nome"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

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

          <div className="input-group">
            <div className="input-icon">
              <Lock size={20} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={toggleConfirmPasswordVisibility}
              disabled={loading}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                Criando conta...
              </>
            ) : (
              'Criar Conta'
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
          Registrar com Google
        </button>

        <div className="auth-footer">
          <p className="auth-link-text">
            Já tem uma conta?{' '}
            <Link to="/login" className="auth-link">
              Fazer login
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

export default Register;