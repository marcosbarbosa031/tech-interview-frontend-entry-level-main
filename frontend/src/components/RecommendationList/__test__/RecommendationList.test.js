import React from 'react';
import { render, screen } from '@testing-library/react';
import RecommendationList from '../RecommendationList';
import useProducts from '../../../hooks/useProducts';

jest.mock('../../ProductCard/ProductCard', () => {
  return function MockProductCard({ product }) {
    return <div data-testid={`product-card-${product.id}`}>{product.name}</div>;
  };
});

jest.mock('../../ErrorScreen/ErrorScreen', () => {
  return function MockErrorScreen({ error }) {
    return <div data-testid="error-screen">Error: {error}</div>;
  };
});

jest.mock('../../../hooks/useProducts', () => {
  return jest.fn();
});

describe('RecommendationList - Testes de Comportamento', () => {
  const mockRecommendations = [
    { id: 1, name: 'Product 1', features: ['feature1'], preferences: ['pref1'] },
    { id: 2, name: 'Product 2', features: ['feature2'], preferences: ['pref2'] },
    { id: 3, name: 'Product 3', features: ['feature3'], preferences: ['pref3'] }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Deve mostrar estado de carregamento quando loading é true', () => {
    useProducts.mockReturnValue({
      loading: true,
      error: null
    });

    render(<RecommendationList recommendations={[]} />);
    
    expect(screen.getByText('Carregando recomendações...')).toBeInTheDocument();
  });

  it('Deve mostrar tela de erro quando há um erro', () => {
    const errorMessage = 'Failed to load products';
    useProducts.mockReturnValue({
      loading: false,
      error: errorMessage
    });

    render(<RecommendationList recommendations={[]} />);
    
    expect(screen.getByTestId('error-screen')).toBeInTheDocument();
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('Deve mostrar mensagem de nenhuma recomendação quando o array de recomendações está vazio', () => {
    useProducts.mockReturnValue({
      loading: false,
      error: null
    });

    render(<RecommendationList recommendations={[]} />);
    
    expect(screen.getByText('Nenhuma recomendação encontrada')).toBeInTheDocument();
  });

  it('Deve renderizar recomendações quando disponíveis', () => {
    useProducts.mockReturnValue({
      loading: false,
      error: null
    });

    render(<RecommendationList recommendations={mockRecommendations} />);
    
    expect(screen.getByText('Recomendações Personalizadas')).toBeInTheDocument();
    expect(screen.getByText('Encontramos 3 produtos para você')).toBeInTheDocument();
    
    mockRecommendations.forEach(product => {
      expect(screen.getByTestId(`product-card-${product.id}`)).toBeInTheDocument();
    });
  });
});
