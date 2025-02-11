import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Tags, Search, Plus, Edit, Trash2 } from 'lucide-react';
import { useCategories } from '../../contexts/CategoryContext';

export function CategoryList() {
  const [search, setSearch] = useState('');
  const { categories, deleteCategory } = useCategories();
  const navigate = useNavigate();

  const filteredCategories = categories.filter(
    category =>
      category.title.toLowerCase().includes(search.toLowerCase()) ||
      category.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      deleteCategory(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Categorias</h1>
        <button
          onClick={() => navigate('/categorias/nova')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nova Categoria</span>
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar categorias..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-12">
          <Tags className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900">Nenhuma categoria encontrada</h3>
          <p className="text-gray-500">Comece adicionando uma nova categoria ao sistema.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Tags className="text-blue-600" size={20} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{category.title}</h3>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/categorias/editar/${category.id}`)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-500">{category.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}