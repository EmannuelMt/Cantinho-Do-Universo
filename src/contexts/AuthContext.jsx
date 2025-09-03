import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação inicial
    const userData = authService.getUser();
    if (userData) {
      setUser(userData);
    }
    setLoading(false);

    // Observar mudanças de autenticação
    const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const userData = authService.getUser();
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Erro ao fazer login' 
      };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await authService.loginWithGoogle();
      
      if (result.success) {
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Erro ao fazer login com Google' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const result = await authService.register(userData);
      
      if (result.success) {
        setUser(result.user);
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.message || 'Erro ao registrar' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const result = await authService.logout();
      if (result.success) {
        setUser(null);
      }
      return result;
    } catch (error) {
      return { 
        success: false, 
        message: error.message 
      };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email) => {
    return await authService.resetPassword(email);
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    resetPassword,
    loading,
    isAuthenticated: () => !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};