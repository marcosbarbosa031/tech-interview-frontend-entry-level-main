import React from 'react';
import { Button } from '../Form/Button';

const ProductCard = ({ product }) => {
  const getStars = () => {
    return (
      <div className="flex items-center space-x-1 mb-3">
        {[...Array(5)].map((_, index) => (
          <span key={index}>
            ⭐
          </span>
        ))}
        <span className="text-sm text-gray-600 ml-2">
          (5)
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      {/* Header do Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {product.name}
        </h3>
        
        {getStars()}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6">
        {/* Principais Features */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Principais recursos:</h4>
          <ul className="space-y-1">
            {product.features && product.features.map((feature, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="text-green-500 mr-2 mt-0.5">✓</span>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Preferências atendidas */}
        {product.preferences && product.preferences.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Ideal para:</h4>
            <div className="flex flex-wrap gap-1">
              {product.preferences.map((preference, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                >
                  {preference}
                </span>
              ))}
            </div>
          </div>
        )}

        <Button
          text="Ver Mais Detalhes"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ProductCard;
