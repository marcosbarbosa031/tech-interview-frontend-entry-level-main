import { renderHook } from '@testing-library/react';
import useRecommendations from '../useRecommendations';
import recommendationService from '../../services/recommendation.service';
import RecomendationTypeEnum from '../../enum/recommendationType.enum';
import mockProducts from '../../mocks/mockProducts';

jest.mock('../../services/recommendation.service');

describe('useRecommendations', () => {

  const mockFormData = {
    selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
    selectedFeatures: ['Gestão de leads e oportunidades'],
    selectedRecommendationType: RecomendationTypeEnum.MULTIPLE_PRODUCTS
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve inicializar com tipo de recomendação padrão', () => {
    const { result } = renderHook(() => useRecommendations());

    expect(result.current.defaultRecommendationType).toBe(RecomendationTypeEnum.MULTIPLE_PRODUCTS);
  });

  it('Deve chamar recommendationService.getRecommendations quando getRecommendations é chamado', () => {
    const mockRecommendations = [mockProducts[0]];
    recommendationService.getRecommendations.mockReturnValue(mockRecommendations);

    const { result } = renderHook(() => useRecommendations());

    const recommendations = result.current.getRecommendations(mockFormData, mockProducts);

    expect(recommendationService.getRecommendations).toHaveBeenCalledWith(mockFormData, mockProducts);
    expect(recommendations).toEqual(mockRecommendations);
  });
});
