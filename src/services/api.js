import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const momentosAPI = {
  getAll: () => api.get('/momentos'),
  create: (momento) => api.post('/momentos', momento),
  update: (id, momento) => api.put(`/momentos/${id}`, momento),
  delete: (id) => api.delete(`/momentos/${id}`),
};

export default api;