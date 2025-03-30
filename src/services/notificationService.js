import api from './api';

const notificationService = {
  getNotifications: async (params = {}) => {
    try {
      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        },
        params
      };
      
      const response = await api.get('/notifications', config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getUnreadCount: async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        },
        params: { limit: 1, unreadOnly: true }
      };
      
      const response = await api.get('/notifications', config);
      return response.data.unread;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  markAsRead: async (notificationId) => {
    try {
      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.put(`/notifications/${notificationId}/read`, {}, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  markAllAsRead: async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.put('/notifications/read-all', {}, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteNotification: async (notificationId) => {
    try {
      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.delete(`/notifications/${notificationId}`, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default notificationService;