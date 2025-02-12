import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

export function Register() {
	const [loginFormData, setLoginFormData] = useState({
		name: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const { register } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (loginFormData.password !== loginFormData.confirmPassword) {
			toast.error('As senhas não coincidem');
			return;
		}

		try {
			await register(loginFormData.username, loginFormData.name, loginFormData.email, loginFormData.password);
			toast.success('Conta criada com sucesso');
			navigate('/');
		} catch (err) {
			toast.error('Erro ao criar conta');
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto">
						<UserPlus className="text-white" size={24} />
					</div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Criar Nova Conta
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Ou{' '}
						<a
							href="/login"
							className="font-medium text-blue-600 hover:text-blue-500"
						>
							entrar com uma conta existente
						</a>
					</p>
				</div>
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="name" className="sr-only">
								Nome Completo
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								value={loginFormData.name}
								onChange={(e) => setLoginFormData({ ...loginFormData, name: e.target.value })}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Nome completo"
							/>
						</div>

						<div>
							<label htmlFor="username" className="sr-only">
								Nome de Usuário
							</label>
							<input
								id="username"
								name="username"
								type="text"
								required
								value={loginFormData.username}
								onChange={(e) => setLoginFormData({ ...loginFormData, username: e.target.value })}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Nome completo"
							/>
						</div>

						<div>
							<label htmlFor="email" className="sr-only">
								Email
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={loginFormData.email}
								onChange={(e) => setLoginFormData({ ...loginFormData, email: e.target.value })}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Email"
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Senha
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								value={loginFormData.password}
								onChange={(e) => setLoginFormData({ ...loginFormData, password: e.target.value })}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Senha"
							/>
						</div>
						<div>
							<label htmlFor="confirmPassword" className="sr-only">
								Confirmar Senha
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								required
								value={loginFormData.confirmPassword}
								onChange={(e) => setLoginFormData({ ...loginFormData, confirmPassword: e.target.value })}
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
								placeholder="Confirmar senha"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Criar conta
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}