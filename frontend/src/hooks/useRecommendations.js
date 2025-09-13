import { useState } from 'react';
import recommendationService from '../services/recommendation.service';
import RecomendationTypeEnum from '../enum/recommendationType.enum';

function useRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const defaultRecommendationType = RecomendationTypeEnum.MULTIPLE_PRODUCTS;

  const getRecommendations = (formData, products) => {
    return recommendationService.getRecommendations(formData, products);
  };

  return { recommendations, defaultRecommendationType, setRecommendations, getRecommendations };
}

export default useRecommendations;
