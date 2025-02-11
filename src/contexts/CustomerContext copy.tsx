import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { ICustomer } from "../types/customer";
import { api_backend_vercel } from "../api/api_backend_vercel";

interface CustomerContextType {
	getAllCustomers: () => Promise<ICustomer[] | []>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export function CustomerProvider({ children }: { children: ReactNode }) {
	const getAllCustomers = async () => {
		try {
			const { data } = await api_backend_vercel.get("/customers");
			return data;
		} catch (error) {
			console.error("Erro ao buscar clientes:", error);
			return [];
		}
	}


	return (
		<CustomerContext.Provider value={{ getAllCustomers }}>
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
