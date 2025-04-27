import api from "./api";

export const patientService = {
  getAllPatients: async (searchQuery = '') => {
    try {
      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.get(
        `/patients${searchQuery ? `?search=${searchQuery}` : ''}`, 
        config
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getAllPatientsByNurse: async (searchQuery = '') => {
    try {
      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.get(
        `/patients/all${searchQuery ? `?search=${searchQuery}` : ''}`, 
        config
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  getPatientById: async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.get(`/patients/${id}`, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createPatient: async (patientData) => {
    try {
      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.post('/patients', patientData, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  updatePatient: async (id, patientData) => {
    try {
      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.put(`/patients/${id}`, patientData, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  
  deletePatient: async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      
      const config = {
        headers: {
          'x-auth-token': token,
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await api.delete(`/patients/${id}`, config);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default patientService;