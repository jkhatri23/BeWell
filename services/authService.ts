import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://571c-138-51-78-110.ngrok-free.app/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials {
    name: string;
}

export const authService = {
    async register(credentials: RegisterCredentials): Promise<User> {
        try {
            console.log('Attempting to register with:', { ...credentials, password: '[REDACTED]' });
            console.log('API URL:', API_URL);
            
            const response = await api.post('/users/register', credentials);
            console.log('Registration response:', response.data);
            
            if (response.data && response.data.token) {
                await AsyncStorage.setItem('userToken', response.data.token);
                console.log('Token stored successfully');
                return response.data;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Registration error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response:', error.response.data);
                throw error.response.data.message || 'Registration failed';
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                throw 'No response from server. Please check your connection.';
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', error.message);
                throw 'Failed to connect to server. Please try again.';
            }
        }
    },

    async login(credentials: LoginCredentials): Promise<User> {
        try {
            console.log('Attempting to login with:', { ...credentials, password: '[REDACTED]' });
            console.log('API URL:', API_URL);
            
            const response = await api.post('/users/login', credentials);
            console.log('Login response:', response.data);
            
            if (response.data && response.data.token) {
                await AsyncStorage.setItem('userToken', response.data.token);
                console.log('Token stored successfully');
                return response.data;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Login error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                headers: error.response?.headers
            });
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response:', error.response.data);
                throw error.response.data.message || 'Login failed';
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                throw 'No response from server. Please check your connection.';
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', error.message);
                throw 'Failed to connect to server. Please try again.';
            }
        }
    },

    async logout(): Promise<void> {
        await AsyncStorage.removeItem('userToken');
    },

    async uploadPhoto(url: string, caption: string): Promise<void> {
        try {
            await api.post('/users/upload-photo', { url, caption });
        } catch (error) {
            throw error.response?.data?.message || 'Photo upload failed';
        }
    },

    async getCurrentUser(): Promise<User | null> {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) return null;
            const response = await api.get('/users/me');
            return response.data;
        } catch (error) {
            return null;
        }
    }
}; 