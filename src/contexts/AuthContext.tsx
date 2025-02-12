import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IUser } from '../types';
import { useAPI } from './ApiContext';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
	user: IUser | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	register: (username: string, name: string, email: string, password: string) => Promise<void>;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<IUser | null>(null);
	const { apiBackendVercel } = useAPI();

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const { data } = await apiBackendVercel.post('/auth/login', { email, password });
			const payload = jwtDecode(data.token) as IUser;
			payload.token = data.token;

			setUser(payload);
			localStorage.setItem('user', JSON.stringify(payload));
		} catch (error) {
			console.error('Erro ao fazer login:', error);
		}
	};

	const register = async (username: string, name: string, email: string, password: string) => {
		try {
			const data = await apiBackendVercel.post('/auth/register', { name, username, email, password });

			if (data.status === 201) {
				return login(email, password);
			}
		} catch (error) {
			console.error('Erro ao fazer cadastro:', error);
		}
	}

	const logout = () => {
		setUser(null);
		localStorage.removeItem('user');
	};

	return (
		<AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}