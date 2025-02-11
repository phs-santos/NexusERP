import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ProductList } from '../pages/products/ProductList';
import { ProductForm } from '../pages/products/ProductForm';
import { CategoryList } from '../pages/categories/CategoryList';
import { CategoryForm } from '../pages/categories/CategoryForm';
import { CustomerList } from '../pages/customers/CustomerList';
import { CustomerForm } from '../pages/customers/CustomerForm';
import { Toaster } from 'react-hot-toast';

function PrivateRoute({ children }: { children: ReactNode }) {
	const { isAuthenticated } = useAuth();
	return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: ReactNode }) {
	const { isAuthenticated } = useAuth();
	return !isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}

export const AppRoutes = () => {
	return (
		<Router>
			<div className="min-h-screen bg-gray-50">
				<Toaster position="top-right" />
				<Routes>
					<Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
					<Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
					<Route element={<PrivateRoute><Sidebar /></PrivateRoute>}>
						<Route path="/" element={<Dashboard />} />
						<Route path="/produtos" element={<ProductList />} />
						<Route path="/produtos/novo" element={<ProductForm />} />
						<Route path="/produtos/editar/:id" element={<ProductForm />} />
						<Route path="/categorias" element={<CategoryList />} />
						<Route path="/categorias/nova" element={<CategoryForm />} />
						<Route path="/categorias/editar/:id" element={<CategoryForm />} />
						<Route path="/clientes" element={<CustomerList />} />
						<Route path="/clientes/novo" element={<CustomerForm />} />
						<Route path="/clientes/editar/:id" element={<CustomerForm />} />
					</Route>
				</Routes>
			</div>
		</Router>
	);
}