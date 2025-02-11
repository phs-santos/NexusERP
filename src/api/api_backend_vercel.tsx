import axios, { AxiosInstance } from 'axios';
const { VITE_API_BACKEND_VERCEL } = import.meta.env;

const createApiInstance = (baseURL: string): AxiosInstance => {
    const api = axios.create({ baseURL });

    api.interceptors.request.use((config) => {
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error('Erro na requisição:', error);
            return Promise.reject(error);
        }
    );

    return api;
};

export const api_backend_vercel = createApiInstance(VITE_API_BACKEND_VERCEL);
console.log('VITE_API_BACKEND_VERCEL:', VITE_API_BACKEND_VERCEL);

