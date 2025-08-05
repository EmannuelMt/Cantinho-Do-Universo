import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from './useLocalStorage';

export const useAuth = () => {
  const { user, login, logout, setShowAuthModal, authError } = useContext(AuthContext);
  const [storedUser, setStoredUser] = useLocalStorage('user', null);

  const handleLogin = async (name, password) => {
    await login(name, password);
    setStoredUser({ name, password });
  };

  const handleLogout = () => {
    logout();
    setStoredUser(null);
  };

  return {
    user,
    storedUser,
    login: handleLogin,
    logout: handleLogout,
    setShowAuthModal,
    authError,
    isAuthenticated: !!user,
  };
};