import axiosInstance from '../axiosInstance';

export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/api/users/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};