import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_CLOUD_API_URL } from '@env';

// Use environment variable for API URL, fallback to local development URL
const API_URL = GOOGLE_CLOUD_API_URL || 'https://bewell-api-232907245524.us-central1.run.app/api';

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

interface ApiError {
    message: string;
    data?: any;
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
            const axiosError = error as AxiosError<ApiError>;
            console.error('Registration error details:', {
                message: axiosError.message,
                response: axiosError.response?.data,
                status: axiosError.response?.status,
                headers: axiosError.response?.headers
            });
            
            if (axiosError.response) {
                console.error('Error response:', axiosError.response.data);
                throw axiosError.response.data.message || 'Registration failed';
            } else if (axiosError.request) {
                console.error('No response received:', axiosError.request);
                throw 'No response from server. Please check your connection.';
            } else {
                console.error('Error setting up request:', axiosError.message);
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
            const axiosError = error as AxiosError<ApiError>;
            console.error('Login error details:', {
                message: axiosError.message,
                response: axiosError.response?.data,
                status: axiosError.response?.status,
                headers: axiosError.response?.headers
            });
            
            if (axiosError.response) {
                console.error('Error response:', axiosError.response.data);
                throw axiosError.response.data.message || 'Login failed';
            } else if (axiosError.request) {
                console.error('No response received:', axiosError.request);
                throw 'No response from server. Please check your connection.';
            } else {
                console.error('Error setting up request:', axiosError.message);
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
            const axiosError = error as AxiosError<ApiError>;
            throw axiosError.response?.data?.message || 'Photo upload failed';
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