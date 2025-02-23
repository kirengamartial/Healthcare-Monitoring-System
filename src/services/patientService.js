

import api from "./api";

export const patientService = {
  getAllPatients: async (searchQuery = '') => {
    try {
      const response = await api.get(`/patients${searchQuery ? `?search=${searchQuery}` : ''}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getPatientById: async (id) => {
    try {
      const response = await api.get(`/patients/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createPatient: async (patientData) => {
    try {
      const response = await api.post('/patients', patientData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};