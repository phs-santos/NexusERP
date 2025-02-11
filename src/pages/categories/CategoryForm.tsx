import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tags, ArrowLeft } from 'lucide-react';
import { useCategories } from '../../contexts/CategoryContext';
import { Category } from '../../types';

export function CategoryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addCategory, updateCategory, getCategory } = useCategories();
  const [formData, setFormData] = useState<Omit<Category, 'id'>>({
    title: '',
    description: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const category = getCategory(id);
      if (category) {
        const { id: _, ...categoryData } = category;
        setFormData(categoryData);
      }
    }
  }, [id, getCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (id) {
        updateCategory(id, formData);
      } else {
        addCategory(formData);
      }
      navigate('/categorias');
    } catch (err) {
      setError('Erro ao salvar a categoria');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/categorias')}
          className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Tags className="text-blue-600" size={20} />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {id ? 'Editar Categoria' : 'Nova Categoria'}
          </h1>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/categorias')}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {id ? 'Atualizar' : 'Criar'} Categoria
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}