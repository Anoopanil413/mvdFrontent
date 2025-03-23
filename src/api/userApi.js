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
export const ValidateToken = async()=>{
    try {
        const response = await axiosInstance.get('/api/users/validateUser');
        return response.data;
    } catch (error) {
        console.error('Error getting my vehicles:', error);
        throw error;
    }
}
export const sendFCMToken = async(data)=>{
    try {
        const response = await axiosInstance.post('/api/users/fcmToken',data);
        return response.data;
    } catch (error) {
        console.error('Error getting my vehicles:', error);
        throw error;
    }
}
export const updateUserProfile = async(data)=>{
    try {
        const response = await axiosInstance.patch('/api/users/updateProfile',data);
        return response.data;
    } catch (error) {
        console.error('Error getting my vehicles:', error);
        throw error;
    }
}

export const updateVehicle = async(data)=>{
    try {
        const response = await axiosInstance.patch('/api/users/updateVehicle',data);
        return response.data;
    } catch (error) {
        console.error('Error getting my vehicles:', error);
        throw error;
    }
}
export const deleteVehicle = async(data)=>{
    try {
        const response  =  await axiosInstance.delete('/api/users/deleteVehicle',{params:{id:data}});
        return  response.data;
        
    } catch (error) {
        
    }
};

export const sendNotificationToUser =  async (data)=>{
    try {
        const response = await axiosInstance.post('/api/users/sendNotification',data);
        return response.data;
        
    } catch (error) {
        console.log("error",error)
        
    }

};

export const getunreadNotifications = async ()=>{
    try {
        const response = await axiosInstance.get('/api/users/unreadNotifications');
        return response.data;
        
    } catch (error) {
        console.log("error",error)
        
    }
}

export const clearAllNotifications = async ()=>{
    try {
        const response = await axiosInstance.post('/api/users/clearAllNotifications');
        return response.data;
        
    } catch (error) {
        console.log("error",error)
        
    }
}


