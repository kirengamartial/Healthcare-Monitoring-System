import api from './api';
import { setAuthToken } from './authUtils';

const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      const { token, user } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthToken(token);
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');

    setAuthToken(null);
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

export default authService;