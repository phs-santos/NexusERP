import React, { createContext, useContext, ReactNode } from "react";
import axios, { AxiosInstance } from 'axios';
import { IUser } from "../types";
const { VITE_API_BACKEND_VERCEL } = import.meta.env;

interface ApiContextType {
    apiBackendVercel: AxiosInstance;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const apiBackendVercel = createApiInstance(VITE_API_BACKEND_VERCEL);

    return (
        <ApiContext.Provider value={{ apiBackendVercel }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useAPI = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error("useAPI deve ser usado dentro de um ApiProvider");
    }
    return context;
};

const createApiInstance = (baseURL: string): AxiosInstance => {
    const api = axios.create({ baseURL });
    const user = localStorage.getItem('user');
    
    if (user) {
        const { token } = JSON.parse(user) as IUser;
        api.defaults.headers.common['Authorization'] = token;
    }

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