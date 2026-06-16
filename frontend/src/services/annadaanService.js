import api from '../utils/api';

/**
 * Create a new Annadaan request
 * @param {Object} data - { name, phone, annadaanType, date, time, description }
 */
export const createAnnadaan = async (data) => {
  try {
    const response = await api.post('/annadaan', data);
    return response.data;
  } catch (error) {
    console.error('Error in createAnnadaan service:', error);
    throw error.response?.data || { success: false, message: 'Network error or server error' };
  }
};

/**
 * Fetch all Annadaan requests
 */
export const getAnnadaans = async () => {
  try {
    const response = await api.get('/annadaan');
    return response.data;
  } catch (error) {
    console.error('Error in getAnnadaans service:', error);
    throw error.response?.data || { success: false, message: 'Network error or server error' };
  }
};
