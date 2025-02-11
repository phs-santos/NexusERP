import { api_backend_vercel } from "../api/api_backend_vercel";
import { IReturnService } from "../types";
import { ICustomer } from "../types/customer";

export class CustomerService {
    async findAllCustomers(): Promise<ICustomer[]> {
        try {
            console.log('Buscando clientes...');
            const { data } = await api_backend_vercel.get('/customers');
            return data;
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            return [];
        }
    }

    async findCustomerById(id: string): Promise<ICustomer | null> {
        return null; // Exemplo de retorno nulo
    }

    async createCustomer(customer: ICustomer): Promise<ICustomer | null> {
        return null; // Exemplo de retorno nulo
    }

    async updateCustomer(customer: ICustomer): Promise<ICustomer | null> {
        return null; // Exemplo de retorno nulo
    }

    async deleteCustomer(id: string): Promise<IReturnService> {
        return { status: 'success', message: 'Cliente excluído com sucesso!' };
    }
}
