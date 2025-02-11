import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Users, Search, Plus, Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react';
import { useCustomers } from '../../contexts/CustomerContext';
import { ICustomer } from '../../types/customer';

export function CustomerList() {
	const navigate = useNavigate();
	const { getAllCustomers } = useCustomers();

	const [customers, setCustomers] = useState<ICustomer[]>([])
	const [search, setSearch] = useState('');

	useEffect(() => {
		getAllCustomers().then(customers => setCustomers(customers));
	}, [getAllCustomers]);

	const filteredCustomers = customers.filter(
		customer =>
			customer.name.toLowerCase().includes(search.toLowerCase()) ||
			customer.email.toLowerCase().includes(search.toLowerCase())
	);

	const handleDelete = (_id: string | any) => {
		if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
			// deleteCustomer(id);)
		}
	};

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-semibold text-gray-800">Todos os Clientes</h1>
				<button
					onClick={() => navigate('/clientes/novo')}
					className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
				>
					<Plus size={20} />
					<span>Novo Cliente</span>
				</button>
			</div>

			<div className="mb-6">
				<div className="relative">
					<input
						type="text"
						placeholder="Buscar clientes..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
				</div>
			</div>

			{filteredCustomers.length === 0 ? (
				<div className="text-center py-12">
					<Users className="mx-auto text-gray-400 mb-4" size={48} />
					<h3 className="text-lg font-medium text-gray-900">Nenhum cliente encontrado</h3>
					<p className="text-gray-500">Comece adicionando um novo cliente ao sistema.</p>
				</div>
			) : (
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{filteredCustomers.map((customer) => (
						<div
							key={customer._id}
							className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
						>
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
										<span className="text-blue-600 font-medium text-lg">
											{customer.name.charAt(0)}
										</span>
									</div>
									<h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
								</div>
								<div className="flex space-x-2">
									<button
										onClick={() => navigate(`/clientes/editar/${customer._id}`)}
										className="text-blue-600 hover:text-blue-900"
									>
										<Edit size={18} />
									</button>
									<button
										onClick={() => handleDelete(customer._id)}
										className="text-red-600 hover:text-red-900"
									>
										<Trash2 size={18} />
									</button>
								</div>
							</div>
							<div className="space-y-2">
								<div className="flex items-center text-gray-500">
									<Mail className="w-4 h-4 mr-2" />
									<span>{customer.email}</span>
								</div>
								<div className="flex items-center text-gray-500">
									<Phone className="w-4 h-4 mr-2" />
									<span>{customer.phone}</span>
								</div>
								<div className="flex items-center text-gray-500">
									<MapPin className="w-4 h-4 mr-2" />
									<span>{customer.address}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}