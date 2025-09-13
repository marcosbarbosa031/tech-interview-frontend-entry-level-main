import recommendationService from '../recommendation.service';
import mockProducts from '../../mocks/mockProducts';

describe('recommendationService', () => {
  test('Deve retornar array vazio quando não há produtos', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };
    const products = [];

    const recommendations = recommendationService.getRecommendations(
      formData,
      products
    );

    expect(recommendations).toHaveLength(0);
  });

  test('Deve retornar array vazio quando não há matches de preferências', () => {
    const formData = {
      selectedPreferences: ['Preferência inexistente'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts'
    };

    const result = recommendationService.getRecommendations(formData, mockProducts);

    expect(result).toHaveLength(0);
  });

  test('Deve retornar array vazio quando não há matches de funcionalidades', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: ['Funcionalidade inexistente'],
      selectedRecommendationType: 'MultipleProducts'
    };

    const result = recommendationService.getRecommendations(formData, mockProducts);

    expect(result).toHaveLength(0);
  });

  test('Deve retornar todos os produtos quando selectedPreferences e selectedFeatures estão vazios', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts'
    };

    const result = recommendationService.getRecommendations(formData, mockProducts);

    expect(result).toHaveLength(4);
    expect(result).toEqual(mockProducts);
  });

  test('Deve retornar por padrão múltiplos produtos quando selectedRecommendationType não é especificado', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: ''
    };

    const result = recommendationService.getRecommendations(formData, mockProducts);

    expect(result).toHaveLength(4);
    expect(result).toEqual(mockProducts);
  });

  test('Deve filtrar produtos apenas por preferências', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts'
    };

    const result = recommendationService.getRecommendations(formData, mockProducts);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('RD Station Marketing');
  });

  test('Deve filtrar produtos apenas por funcionalidades', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'MultipleProducts'
    };

    const result = recommendationService.getRecommendations(formData, mockProducts);

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('RD Conversas');
  });

  test('Deve retornar recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Deve retornar recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Deve retornar apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Deve retornar o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });
});
