import { Package, Users, AlertTriangle, TrendingUp } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { ReactNode, useEffect, useState } from 'react';
import { useCustomers } from '../contexts/CustomerContext';

interface CardDashboardProps {
	title: string;
	value: string;
	icon: ReactNode;
	iconColor: string;
}

export function Dashboard() {
	const { getTotalCustomers } = useCustomers();
	const [totalCustomers, setTotalCustomers] = useState("Carregando...");

	useEffect(() => {
		async function fetchCustomers() {
			const total = await getTotalCustomers();
			setTotalCustomers(total.toString());
		}

		fetchCustomers();
	}, [getTotalCustomers]);

	const dashboardListCard: CardDashboardProps[] = [
		{
			title: "Total Produtos",
			value: "124",
			icon: <Package className="text-white" size={24} />,
			iconColor: "bg-blue-500",
		},
		{
			title: "Total de Clientes Cadastrados",
			value: totalCustomers,
			icon: <Users className="text-white" size={24} />,
			iconColor: "bg-green-500",
		},
		{
			title: "Produtos com Baixo Estoque",
			value: "3",
			icon: <AlertTriangle className="text-white" size={24} />,
			iconColor: "bg-red-500",
		},
		{
			title: "Vendas Mensais",
			value: "R$ 12.450",
			icon: <TrendingUp className="text-white" size={24} />,
			iconColor: "bg-purple-500",
		},
	];

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
				<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2">
					<span>Nova Venda</span>
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{dashboardListCard.map((card, index) => (
					<DashboardCard
						key={index}
						title={card.title}
						value={card.value}
						icon={card.icon}
						iconColor={card.iconColor}
					/>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<h2 className="text-lg font-semibold mb-4">Atividades recentes</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Novo produto adicionado</p>
								<p className="text-sm text-gray-500">Wireless Headphones</p>
							</div>
							<span className="text-sm text-gray-500">2 hours ago</span>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Stock updated</p>
								<p className="text-sm text-gray-500">Smart Watch - 15 units added</p>
							</div>
							<span className="text-sm text-gray-500">5 hours ago</span>
						</div>
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">New customer registered</p>
								<p className="text-sm text-gray-500">John Smith</p>
							</div>
							<span className="text-sm text-gray-500">1 day ago</span>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					<h2 className="text-lg font-semibold mb-4">Alertas de Baixo Estoque</h2>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
									<AlertTriangle className="text-red-500" size={18} />
								</div>
								<div>
									<p className="font-medium">Wireless Mouse</p>
									<p className="text-sm text-gray-500">Apenas 2 unidades restantes</p>
								</div>
							</div>
							<button className="text-blue-500 hover:text-blue-600 text-sm">
								Atualizar Estoque
							</button>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
									<AlertTriangle className="text-yellow-500" size={18} />
								</div>
								<div>
									<p className="font-medium">USB-C Cable</p>
									<p className="text-sm text-gray-500">Apenas 5 unidades restantes</p>
								</div>
							</div>
							<button className="text-blue-500 hover:text-blue-600 text-sm">
								Atualizar Estoque
							</button>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-3">
								<div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
									<AlertTriangle className="text-yellow-500" size={18} />
								</div>
								<div>
									<p className="font-medium">Power Bank</p>
									<p className="text-sm text-gray-500">Apenas 4 unidades restantes</p>
								</div>
							</div>
							<button className="text-blue-500 hover:text-blue-600 text-sm">
								Atualizar Estoque
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}