export interface User {
	id: string;
	name: string;
	email: string;
	role: 'admin' | 'user';
}

export interface IUser {
	_id: string;
	name: string;
	username: string;
	email: string;
	role: 'admin' | 'user' | 'god';
	exp: number;
	iat: number;
	token: string;
}

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	categoryId: string;
	stock: number;
	minStockLevel: number;
}

export interface Category {
	id: string;
	title: string;
	description: string;
}

export interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
}

export interface Sale {
	id: string;
	customerId: string;
	products: {
		productId: string;
		quantity: number;
		price: number;
	}[];
	total: number;
	status: 'open' | 'completed';
	date: string;
}

export interface StockMovement {
	id: string;
	productId: string;
	quantity: number;
	type: 'in' | 'out';
	date: string;
}

export interface IReturnService {
	status: 'success' | 'error';
	message: string;
}
