export interface ICustomer {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    address: {
        street: string;
        number: string;
        neighborhood: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
}

export interface ICustomerUpdate {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    address?: {
        street?: string;
        number?: string;
        neighborhood?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
    };
}