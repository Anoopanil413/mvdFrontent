import axiosInstance from '../axiosInstance';


export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/api/users/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};