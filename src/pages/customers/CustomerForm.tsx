import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Users, ArrowLeft } from 'lucide-react';
import MaskedInput from '../../components/MaskedInput';
import { ICustomer } from '../../types/customer';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { useCustomers } from '../../contexts/CustomerContext';
import toast from 'react-hot-toast';

export function CustomerForm() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { getCustomerById, createCustomer, updateCustomer } = useCustomers();
	const [formData, setFormData] = useState<Omit<ICustomer, '_id'>>({
		name: '',
		email: '',
		phone: '',
		gender: '',
		address: {
			street: '',
			number: '',
			neighborhood: '',
			city: '',
			state: '',
			zip: '',
			country: ''
		}
	});

	useEffect(() => {
		if (id) {
			const fetchCustomer = async () => {
				const customer = await getCustomerById(id);

				if (!customer) {
					navigate('/clientes');
				} else {
					setFormData(customer);
				}
			};
			fetchCustomer();
		}
	}, [id, getCustomerById, navigate]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
	
		// Validação: impedir envio se houver campos vazios ao criar um novo usuário
		if (!id && (Object.values(formData).some(value => !value) || Object.values(formData.address).some(value => !value))) {
			toast.error('Preencha todos os campos');
			return;
		}
	
		try {
			let success = false;
	
			if (id) {
				// Atualizar usuário existente
				const customerUpdated = await updateCustomer(formData);
				if (customerUpdated) success = true;
				if (success) toast.success('Cliente atualizado com sucesso');
			} else {
				// Criar novo usuário
				const customerCreated = await createCustomer(formData);
				if (customerCreated) success = true;

				if (success) {
					toast.success('Cliente criado com sucesso');
					setFormData({
						name: '',
						email: '',
						phone: '',
						gender: '',
						address: {
							street: '',
							number: '',
							neighborhood: '',
							city: '',
							state: '',
							zip: '',
							country: ''
						}
					});
				}
			}
	
			if (success) navigate('/clientes');
		} catch (error) {
			console.error(`Erro ao ${id ? 'atualizar' : 'criar'} cliente:`, error);
			toast.error(`Erro ao ${id ? 'atualizar' : 'criar'} cliente`);
		}
	};	

	const handleCancel = () => {
		setFormData({
			name: '',
			email: '',
			phone: '',
			gender: '',
			address: {
				street: '',
				number: '',
				neighborhood: '',
				city: '',
				state: '',
				zip: '',
				country: ''
			}
		});
		navigate('/clientes');
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		if (name.startsWith('address.')) {
			const addressField = name.split('.')[1];
			setFormData(prev => ({
				...prev,
				address: {
					...prev.address,
					[addressField]: value
				}
			}));
		} else {
			setFormData(prev => ({ ...prev, [name]: value }));
		}
	};

	return (
		<div className="p-6">
			<div className="mb-6">
				<button onClick={() => navigate('/clientes')} className="text-gray-600 hover:text-gray-900 flex items-center space-x-2">
					<ArrowLeft size={20} />
					<span>Voltar</span>
				</button>
			</div>

			<div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
				<div className="flex items-center space-x-3 mb-6">
					<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
						<Users className="text-blue-600" size={20} />
					</div>
					<h1 className="text-2xl font-semibold text-gray-900">
						{id ? 'Editar Cliente' : 'Novo Cliente'}
					</h1>
				</div>

				<Tabs>
					<TabList>
						<Tab>Informações Gerais</Tab>
						<Tab>Endereço</Tab>
					</TabList>

					<form onSubmit={handleSubmit}>
						<TabPanel>
							<div className="space-y-6">
								<div className="grid grid-cols-2 gap-4">
									{/* Coluna 1 */}
									<div>
										<label htmlFor="name" className="block text-sm font-medium text-gray-700">
											Nome
										</label>

										<input
											type="text"
											id="name"
											name="name"
											required
											value={formData.name}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>

									{/* Coluna 2 */}
									<div>
										<label htmlFor="email" className="block text-sm font-medium text-gray-700">
											Email
										</label>

										<input
											type="email"
											id="email"
											name="email"
											required
											value={formData.email}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>

									{/* Coluna 1 */}
									<div>
										<label htmlFor="phone" className="block text-sm font-medium text-gray-700">
											Telefone
										</label>

										<MaskedInput
											mask="(99) 99999-9999"
											type="tel"
											id="phone"
											name="phone"
											required
											value={formData.phone}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>

									{/* Coluna 2 */}
									<div>
										<label htmlFor="gender" className="block text-sm font-medium text-gray-700">
											Gênero
										</label>
										<select
											id="gender"
											name="gender"
											required
											value={formData.gender}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										>
											<option value="">Selecione</option>
											<option value="male">Masculino</option>
											<option value="female">Feminino</option>
											<option value="other">Outro</option>
										</select>
									</div>
								</div>
							</div>
						</TabPanel>

						<TabPanel>
							<div className="space-y-6">
								<div className="grid grid-cols-3 gap-4">
									{/* Linha 1: CEP, Rua e Número */}
									<div className="flex-grow">
										<label htmlFor="zip" className="block text-sm font-medium text-gray-700">
											CEP
										</label>

										<MaskedInput
											mask="99999-999"
											type="text"
											id="zip"
											name="address.zip"
											required
											value={formData.address.zip}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>

									<div className="flex-grow">
										<label htmlFor="street" className="block text-sm font-medium text-gray-700">
											Rua
										</label>

										<input
											type="text"
											id="street"
											name="address.street"
											required
											value={formData.address.street}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>

									<div className="flex-grow">
										<label htmlFor="number" className="block text-sm font-medium text-gray-700">
											Número
										</label>

										<input
											type="text"
											id="number"
											name="address.number"
											required
											value={formData.address.number}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>
								</div>

								<div className="grid grid-cols-2 gap-4">
									{/* Linha 2: Bairro e Cidade */}
									<div>
										<label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
											Bairro
										</label>
										<input
											type="text"
											id="neighborhood"
											name="address.neighborhood"
											required
											value={formData.address.neighborhood}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>

									<div>
										<label htmlFor="city" className="block text-sm font-medium text-gray-700">
											Cidade
										</label>
										<input
											type="text"
											id="city"
											name="address.city"
											required
											value={formData.address.city}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>

									{/* Linha 3: Estado e País */}
									<div>
										<label htmlFor="state" className="block text-sm font-medium text-gray-700">
											Estado
										</label>
										<input
											type="text"
											id="state"
											name="address.state"
											required
											value={formData.address.state}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>

									<div>
										<label htmlFor="country" className="block text-sm font-medium text-gray-700">
											País
										</label>
										<input
											type="text"
											id="country"
											name="address.country"
											required
											value={formData.address.country}
											onChange={handleChange}
											className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
										/>
									</div>
								</div>
							</div>
						</TabPanel>


						<div className="flex justify-end space-x-3 mt-6">
							<button
								type="button"
								onClick={handleCancel}
								className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							>
								{id ? 'Atualizar' : 'Criar'} Cliente
							</button>
						</div>
					</form>
				</Tabs>
			</div>
		</div>
	);
}
