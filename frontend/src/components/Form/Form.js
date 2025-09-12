// Form.js

import React, { useEffect } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';

function Form() {
  const { preferences, features, products, loading, error } = useProducts();
  const { defaultRecommendationType, getRecommendations } = useRecommendations(products);
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataRecommendations = getRecommendations(formData);

    /**
     * Defina aqui a lógica para atualizar as recomendações e passar para a lista de recomendações
     */
  };

  useEffect(() => {
    if (defaultRecommendationType) {
      handleChange('selectedRecommendationType', defaultRecommendationType);
    }
  }, [defaultRecommendationType, handleChange]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="text-center">Carregando produtos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <div className="text-center text-red-500">Erro ao carregar produtos: {error}</div>
      </div>
    );
  }

  return (
    <form
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <Preferences
        preferences={preferences}
        onPreferenceChange={(selected) =>
          handleChange('selectedPreferences', selected)
        }
      />
      <Features
        features={features}
        onFeatureChange={(selected) =>
          handleChange('selectedFeatures', selected)
        }
      />
      <RecommendationType
        onRecommendationTypeChange={(selected) => 
          handleChange('selectedRecommendationType', selected)
        }
        required
      />
      <SubmitButton text="Obter recomendação" />
    </form>
  );
}

export default Form;
