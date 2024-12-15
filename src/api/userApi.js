import { data } from 'react-router-dom';
import axiosInstance from './axiosInstance';

export const loginUser = async (credentials) => {
    try {
        const response = await axiosInstance.post('/api/users/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};


export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/api/users/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const verifyUser  = async (data) => {
    try {
        const response = await axiosInstance.post('/api/users/verify', data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const createVehicle  = async (data) => {
    try {
        const response = await axiosInstance.post('/api/users/addVehicle', data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const getMyvehicles = async()=>{
    try {
        const response = await axiosInstance.get('/api/users/getMyVehicles');
        return response.data;
    } catch (error) {
        console.error('Error getting my vehicles:', error);
        throw error;
    }
}
export const searchVehicle = async(data)=>{
    try {
        const response = await axiosInstance.post('/api/users/getVehicleOwner',data);
        return response.data;
    } catch (error) {
        console.error('Error getting my vehicles:', error);
        throw error;
    }
}
export const sendUserMessage = async(data)=>{
    try {
        const response = await axiosInstance.post('/api/users/sendMessage',data);
        return response.data;
    } catch (error) {
        console.error('Error getting my vehicles:', error);
        throw error;
    }
}
export const ValidateToken = async(data)=>{
    try {
        const response = await axiosInstance.get('/api/users/validateUser');
        return response.data;
    } catch (error) {
        console.error('Error getting my vehicles:', error);
        throw error;
    }
}