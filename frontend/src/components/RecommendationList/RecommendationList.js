import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import ErrorScreen from '../ErrorScreen/ErrorScreen';
import useProducts from '../../hooks/useProducts';

function RecommendationList({ recommendations }) {
  const { loading, error } = useProducts();

  // Estado de loading
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl font-bold text-gray-800">Carregando recomendações...</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
              <div className="bg-gray-200 h-24"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  // Estado vazio
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Nenhuma recomendação encontrada
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Tente ajustar seus filtros ou selecionar diferentes preferências para encontrar produtos que atendam às suas necessidades.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header da seção */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Recomendações Personalizadas
            </h2>
            <p className="text-gray-600">
              Encontramos {recommendations.length} {recommendations.length === 1 ? 'produto' : 'produtos'} para você
            </p>
          </div>
        </div>

        {/* Badge de resultados */}
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
          {recommendations.length} resultado{recommendations.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {recommendations.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;
