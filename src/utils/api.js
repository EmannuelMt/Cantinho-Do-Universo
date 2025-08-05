import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funções específicas para o projeto
export const MemoriesAPI = {
  getAll: () => api.get('/memories'),
  create: (memory) => api.post('/memories', memory),
  delete: (id) => api.delete(`/memories/${id}`),
};

export const LettersAPI = {
  getAll: () => api.get('/letters'),
  create: (letter) => api.post('/letters', letter),
  getPrivate: (password) => api.get('/letters/private', { params: { password } }),
};