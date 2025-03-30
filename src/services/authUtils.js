import api from './api';

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    delete api.defaults.headers.common['Authorization'];
  }
};

export const initializeAuth = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    setAuthToken(token);
  }
};

initializeAuth();