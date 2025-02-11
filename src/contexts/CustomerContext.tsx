import { createContext, useContext, ReactNode } from "react";
import { ICustomer } from "../types/customer";
import { useAPI } from "./ApiContext";

interface CustomerContextType {
	getAllCustomers: () => Promise<ICustomer[]>;
	createCustomer: (customer: ICustomer) => Promise<ICustomer>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
	const { apiBackendVercel } = useAPI();
	const getAllCustomers = async () => {
		try {
			const { data } = await apiBackendVercel.get("/customers");
			return data;
		} catch (error) {
			console.error("Erro ao buscar clientes:", error);
			return [];
		}
	};

	const createCustomer = async (customer: ICustomer) => {
		try {
			const { data } = await apiBackendVercel.post("/customers", customer);
			return data;
		} catch (error) {
			console.error("Erro ao criar cliente:", error);
			return null;
		}
	}

	return (
		<CustomerContext.Provider value={{ getAllCustomers, createCustomer }}>
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
