// useRecommendations.js

import { useState } from 'react';
import recommendationService from '../services/recommendation.service';
import RECOMMENDATION_TYPE from '../enum/recommendationType.enum';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);
  const defaultRecommendationType = RECOMMENDATION_TYPE.SINGLE_PRODUCT;

  const getRecommendations = (formData) => {
    return recommendationService.getRecommendations(formData, products);
  };

  return { recommendations, defaultRecommendationType, setRecommendations, getRecommendations };
}

export default useRecommendations;
