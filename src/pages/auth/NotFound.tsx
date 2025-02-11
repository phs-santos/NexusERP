import { useNavigate } from 'react-router';
import { AlertTriangle } from 'lucide-react';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center mx-auto">
                        <AlertTriangle className="text-white" size={24} />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Página Não Encontrada
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        A página que você está procurando não existe ou foi movida.
                    </p>
                </div>
                <div>
                    <button
                        onClick={() => navigate('/')}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Voltar para a Página Inicial
                    </button>
                </div>
            </div>
        </div>
    );
}