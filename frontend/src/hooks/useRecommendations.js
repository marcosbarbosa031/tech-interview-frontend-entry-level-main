import recommendationService from '../services/recommendation.service';
import RecomendationTypeEnum from '../enum/recommendationType.enum';

function useRecommendations() {
  const defaultRecommendationType = RecomendationTypeEnum.MULTIPLE_PRODUCTS;

  const getRecommendations = (formData, products) => {
    return recommendationService.getRecommendations(formData, products);
  };

  return { defaultRecommendationType, getRecommendations };
}

export default useRecommendations;
