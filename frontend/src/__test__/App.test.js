import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

jest.mock('../components/Header/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">Header Component</header>;
  };
});

jest.mock('../components/Form/Form', () => {
  return function MockForm({ onGetRecommendations }) {
    return (
      <div data-testid="form">
        <button 
          onClick={() => onGetRecommendations([{ id: 1, name: 'Test Product' }])}
          data-testid="mock-apply-filters"
        >
          Apply Filters
        </button>
      </div>
    );
  };
});

jest.mock('../components/RecommendationList/RecommendationList', () => {
  return function MockRecommendationList({ recommendations }) {
    return (
      <div data-testid="recommendation-list">
        <div data-testid="recommendations-count">{recommendations.length}</div>
        {recommendations.map(rec => (
          <div key={rec.id} data-testid={`recommendation-${rec.id}`}>
            {rec.name}
          </div>
        ))}
      </div>
    );
  };
});

describe('App - Testes de Comportamento de Integração', () => {
  it('Deve inicializar com recomendações vazias', () => {
    render(<App />);
    
    expect(screen.getByTestId('recommendations-count')).toHaveTextContent('0');
  });

  it('Deve atualizar recomendações quando o formulário aciona onGetRecommendations', () => {
    render(<App />);
    
    expect(screen.getByTestId('recommendations-count')).toHaveTextContent('0');
    
    const applyButton = screen.getByTestId('mock-apply-filters');
    fireEvent.click(applyButton);
    
    expect(screen.getByTestId('recommendations-count')).toHaveTextContent('1');
    expect(screen.getByTestId('recommendation-1')).toHaveTextContent('Test Product');
  });
});
