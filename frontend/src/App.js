import React, { useState, useCallback } from 'react';
import Header from './components/Header/Header';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import ErrorScreen from './components/ErrorScreen/ErrorScreen';
import RecommendationList from './components/RecommendationList/RecommendationList';
import useProducts from './hooks/useProducts';
import useForm from './hooks/useForm';
import useRecommendations from './hooks/useRecommendations';
import RECOMMENDATION_TYPE from './enum/recommendationType.enum';

const { MULTIPLE_PRODUCTS } = RECOMMENDATION_TYPE;

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const { preferences, features, products, loading, error } = useProducts();
  const { getRecommendations } = useRecommendations(products);
  const { formData, handleChange, resetToDefault } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: MULTIPLE_PRODUCTS,
  });

  const handleApplyFilters = useCallback(async () => {
    setIsFiltering(true);
    try {
      const results = getRecommendations(formData);
      setRecommendations(results);
    } catch (error) {
      console.error('Erro ao aplicar filtros:', error);
    } finally {
      setIsFiltering(false);
    }
  }, [formData, getRecommendations]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar de Filtros */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <FilterSidebar
                preferences={preferences}
                features={features}
                formData={formData}
                handleChange={handleChange}
                onApplyFilters={handleApplyFilters}
                onClearFilters={resetToDefault}
                loading={loading}
              />
            </div>
          </div>

          {/* Área Principal de Resultados */}
          <div className="lg:col-span-3">
            {error ? (
              <ErrorScreen error={error} />
            ) : (
              <RecommendationList
                recommendations={recommendations}
                loading={loading || isFiltering}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
