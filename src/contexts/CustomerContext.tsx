import { createContext, useContext, ReactNode, useState } from "react";
import { ICustomer, ICustomerUpdate } from "../types/customer";
import { useAPI } from "./ApiContext";

interface CustomerContextType {
	loading: boolean;
	getAllCustomers: () => Promise<ICustomer[]>;
	getTotalCustomers: () => Promise<number>;
	getCustomerById: (_id: string) => Promise<ICustomer | null>;
	createCustomer: (customer: ICustomer) => Promise<ICustomer>;
	updateCustomer: (customer: ICustomerUpdate) => Promise<ICustomer>;
	deleteCustomer: (_id: string) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
	const { apiBackendVercel } = useAPI();

	const [loading, setLoading] = useState(false);

	const getAllCustomers = async () => {
		setLoading(true);
		try {
			const { data } = await apiBackendVercel.get("/customers");
			return data;
		} catch (error) {
			console.error("Erro ao buscar clientes:", error);
			return [];
		} finally {
			setLoading(false);
		}
	};

	const getTotalCustomers = async () => {
		setLoading(true);
		try {
			const { data } = await apiBackendVercel.get("/customers/total");
			return data;
		} catch (error) {
			console.error("Erro ao buscar total de clientes:", error);
			return 0;
		} finally {
			setLoading(false);
		}
	};

	const getCustomerById = async (_id: string) => {
		setLoading(true);
		try {
			const { data } = await apiBackendVercel.get(`/customers/${_id}`);
			return data;
		} catch (error) {
			console.error("Erro ao buscar cliente:", error);
			return null;
		} finally {
			setLoading(false);
		}
	}

	const createCustomer = async (customer: ICustomer) => {
		setLoading(true);
		try {
			const { data } = await apiBackendVercel.post("/customers", customer);
			return data;
		} catch (error) {
			console.error("Erro ao criar cliente:", error);
			return null;
		} finally {
			setLoading(false);
		}
	}

	const updateCustomer = async (customer: ICustomerUpdate) => {
		setLoading(true);
		try {
			const { data } = await apiBackendVercel.put(`/customers/${customer._id}`, customer);
			return data;
		} catch (error) {
			console.error("Erro ao atualizar cliente:", error);
			return null;
		} finally {
			setLoading(false);
		}
	}

	const deleteCustomer = async (_id: string) => {
		setLoading(true);
		try {
			await apiBackendVercel.delete(`/customers/${_id}`);
			console.log(`Cliente ${_id} excluído!`);
		} catch (error) {
			console.error("Erro ao deletar cliente:", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<CustomerContext.Provider value={{ loading, getAllCustomers, getTotalCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer }}>
			{children}
		</CustomerContext.Provider>
	);
}

export function useCustomers() {
	const context = useContext(CustomerContext);
	if (!context) {
		throw new Error("useCustomers deve ser usado dentro de um CustomerProvider");
	}
	return context;
}
