import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_NODE_BASE_URL, 
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); 

        if (token) {
            const authToken = JSON.parse(token);
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with a status other than 2xx
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized access
                    console.error('Unauthorized access - possibly invalid token');
                    // Optionally, redirect to login page
                    break;
                case 500:
                    // Handle server error
                    console.error('Server error');
                    break;
                default:
                    console.error(`Error: ${error.response.status}`);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received from server');
        } else {
            // Something else happened while setting up the request
            console.error('Error', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;