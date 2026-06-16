import api from '../utils/api';

/**
 * Fetch current live stream status and data
 */
export const getCurrentLiveStream = async () => {
  try {
    const response = await api.get('/live/current');
    return response.data;
  } catch (error) {
    console.error('Error in getCurrentLiveStream service:', error);
    throw error.response?.data || { success: false, message: 'Network error or server error' };
  }
};

/**
 * Fetch history and upcoming live streams
 */
export const getLiveStreamsHistory = async () => {
  try {
    const response = await api.get('/live/history');
    return response.data;
  } catch (error) {
    console.error('Error in getLiveStreamsHistory service:', error);
    throw error.response?.data || { success: false, message: 'Network error or server error' };
  }
};

/**
 * Create a new live stream / scheduled event (usually admin functionality)
 * @param {Object} data - { title, description, streamUrl, thumbnail, isLive, scheduledAt }
 */
export const createLiveStream = async (data) => {
  try {
    const response = await api.post('/live', data);
    return response.data;
  } catch (error) {
    console.error('Error in createLiveStream service:', error);
    throw error.response?.data || { success: false, message: 'Network error or server error' };
  }
};
