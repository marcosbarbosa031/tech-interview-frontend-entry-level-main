import React, { useCallback } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

const Form = ({ onGetRecommendations }) => {
  const { preferences, features, products, loading } = useProducts();
  const { getRecommendations, defaultRecommendationType } = useRecommendations(products);
  const { formData, handleChange, resetToDefault } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: defaultRecommendationType,
  });

  const handleApplyFilters = useCallback(async () => {
    try {
      const results = getRecommendations(formData);
      onGetRecommendations(results);
    } catch (error) {
      console.error('Erro ao aplicar filtros:', error);
    }
  }, [formData, getRecommendations, onGetRecommendations]);

  const hasActiveFilters = 
    formData.selectedPreferences?.length > 0 || 
    formData.selectedFeatures?.length > 0 || 
    formData.selectedRecommendationType !== defaultRecommendationType;
  
  const renderSkeletonLoading = () => {
    return [...Array(3)].map((_, index) => (
      <div key={index} className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-300 w-full `}>
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Filtros</h2>
              <p className="text-sm text-gray-600">Personalize sua busca</p>
            </div>
          </div>
        </div>

        {/* Indicador de filtros ativos */}
        { hasActiveFilters && (
          <div className="mt-3 flex items-center space-x-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-blue-600 font-medium">
              {(formData.selectedPreferences?.length || 0) + (formData.selectedFeatures?.length || 0)} filtros ativos
            </span>
          </div>
        )}
      </div>

      <div className="p-6 space-y-8">
        {/* Loading State */}
        {loading ? renderSkeletonLoading() : (
          <>
            {/* Seção de Preferências */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Preferências</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Preferences
                  preferences={preferences}
                  selectedPreferences={formData.selectedPreferences}
                  onPreferenceChange={(selected) =>
                    handleChange('selectedPreferences', selected)
                  }
                />
              </div>
            </div>

            {/* Seção de Funcionalidades */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Funcionalidades</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <Features
                  features={features}
                  selectedFeatures={formData.selectedFeatures}
                  onFeatureChange={(selected) =>
                    handleChange('selectedFeatures', selected)
                  }
                />
              </div>
            </div>

            {/* Seção de Tipo de Recomendação */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Tipo de Recomendação</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <RecommendationType
                  recommendationType={formData.selectedRecommendationType}
                  onRecommendationTypeChange={(selected) =>
                    handleChange('selectedRecommendationType', selected)
                  }
                />
              </div>
            </div>
          </>
        )}

        {/* Botões de Ação */}
        <div className="space-y-3 pt-6 border-t border-gray-100">
          <button
            onClick={handleApplyFilters}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Filtrando...' : 'Aplicar Filtros'}</span>
          </button>
          
          <button
            onClick={resetToDefault}
            disabled={loading || !hasActiveFilters}
            className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <span>Limpar Filtros</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
