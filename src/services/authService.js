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
      console.log(user, 'my user');
      
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
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getUser: () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return null;
      
      const parsedUser = JSON.parse(user);
      
      if (!parsedUser || typeof parsedUser !== 'object') {
        console.warn('Invalid user data in localStorage');
        return null;
      }
      
      return parsedUser;
    } catch (error) {
      console.error('Error retrieving user data:', error);
      localStorage.removeItem('user');
      return null;
    }
  },

  getUserRole: () => {
    const user = authService.getUser();
    return user ? user.role : null;
  },

  hasRole: (requiredRoles) => {
    const user = authService.getUser();
    if (!user || !user.role) return false;
    
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(user.role);
    }
    return user.role === requiredRoles;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('authToken');
  }
};

export default authService;