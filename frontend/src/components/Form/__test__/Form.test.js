import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from '../Form';
import useProducts from '../../../hooks/useProducts';
import useForm from '../../../hooks/useForm';
import useRecommendations from '../../../hooks/useRecommendations';

jest.mock('../../../hooks/useProducts', () => {
  return jest.fn();
});
jest.mock('../../../hooks/useForm', () => {
  return jest.fn();
});
jest.mock('../../../hooks/useRecommendations', () => {
  return jest.fn();
});

jest.mock('../Fields', () => ({
  Preferences: ({ onPreferenceChange }) => (
    <div data-testid="preferences">
      <button onClick={() => onPreferenceChange(['pref1'])}>Select Preference</button>
    </div>
  ),
  Features: ({ onFeatureChange }) => (
    <div data-testid="features">
      <button onClick={() => onFeatureChange(['feature1'])}>Select Feature</button>
    </div>
  ),
  RecommendationType: ({ onRecommendationTypeChange }) => (
    <div data-testid="recommendation-type">
      <button onClick={() => onRecommendationTypeChange('SingleProduct')}>Select Type</button>
    </div>
  )
}));

jest.mock('../Button', () => ({
  Button: ({ text, onClick, disabled }) => (
    <button 
      onClick={onClick} 
      disabled={disabled}
      data-testid={text.toLowerCase().replace(/\s+/g, '-')}
    >
      {text}
    </button>
  )
}));

describe('Form - Testes de Comportamento', () => {
  const mockOnGetRecommendations = jest.fn();
  const mockHandleChange = jest.fn();
  const mockResetToDefault = jest.fn();
  const mockGetRecommendations = jest.fn();

  const defaultMocks = {
    useProducts: {
      preferences: ['pref1', 'pref2'],
      features: ['feature1', 'feature2'],
      products: [{ id: 1, name: 'Product 1' }],
      loading: false
    },
    useForm: {
      formData: {
        selectedPreferences: [],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts'
      },
      handleChange: mockHandleChange,
      resetToDefault: mockResetToDefault
    },
    useRecommendations: {
      getRecommendations: mockGetRecommendations,
      defaultRecommendationType: 'MultipleProducts'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    useProducts.mockReturnValue(defaultMocks.useProducts);
    useForm.mockReturnValue(defaultMocks.useForm);
    useRecommendations.mockReturnValue(defaultMocks.useRecommendations);
  });

  it('Deve desabilitar interações do formulário quando carregando', () => {
    useProducts.mockReturnValue({
      ...defaultMocks.useProducts,
      loading: true
    });

    render(<Form onGetRecommendations={mockOnGetRecommendations} />);
    
    const applyButton = screen.getByTestId('aplicar-filtros');
    expect(applyButton).toBeDisabled();
  });

  it('Deve desabilitar botão limpar filtros quando não há filtros ativos', () => {
    render(<Form onGetRecommendations={mockOnGetRecommendations} />);
    
    const clearButton = screen.getByTestId('limpar-filtros');
    expect(clearButton).toBeDisabled();
  });

  it('Deve habilitar botão limpar filtros quando há filtros ativos', () => {
    useForm.mockReturnValue({
      ...defaultMocks.useForm,
      formData: {
        selectedPreferences: ['pref1'],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts'
      }
    });

    render(<Form onGetRecommendations={mockOnGetRecommendations} />);
    
    const clearButton = screen.getByTestId('limpar-filtros');
    expect(clearButton).not.toBeDisabled();
  });

  it('Deve chamar onGetRecommendations quando aplicar filtros é clicado', async () => {
    const mockResults = [{ id: 1, name: 'Product 1' }];
    mockGetRecommendations.mockReturnValue(mockResults);

    render(<Form onGetRecommendations={mockOnGetRecommendations} />);
    
    const applyButton = screen.getByTestId('aplicar-filtros');
    fireEvent.click(applyButton);

    await waitFor(() => [
      expect(mockGetRecommendations).toHaveBeenCalledWith(defaultMocks.useForm.formData, defaultMocks.useProducts.products),
      expect(mockOnGetRecommendations).toHaveBeenCalledWith(mockResults),
    ]);
  });

  it('Deve chamar resetToDefault quando limpar filtros é clicado', () => {
    useForm.mockReturnValue({
      ...defaultMocks.useForm,
      formData: {
        selectedPreferences: ['pref1'],
        selectedFeatures: [],
        selectedRecommendationType: 'MultipleProducts'
      }
    });

    render(<Form onGetRecommendations={mockOnGetRecommendations} />);
    
    const clearButton = screen.getByTestId('limpar-filtros');
    fireEvent.click(clearButton);

    expect(mockResetToDefault).toHaveBeenCalledTimes(1);
  });

  it('Deve lidar com mudanças de preferências corretamente', () => {
    render(<Form onGetRecommendations={mockOnGetRecommendations} />);
    
    const selectButton = screen.getByText('Select Preference');
    fireEvent.click(selectButton);

    expect(mockHandleChange).toHaveBeenCalledWith('selectedPreferences', ['pref1']);
  });

  it('Deve lidar com mudanças de funcionalidades corretamente', () => {
    render(<Form onGetRecommendations={mockOnGetRecommendations} />);
    
    const selectButton = screen.getByText('Select Feature');
    fireEvent.click(selectButton);

    expect(mockHandleChange).toHaveBeenCalledWith('selectedFeatures', ['feature1']);
  });

  it('Deve lidar com mudanças de tipo de recomendação corretamente', () => {
    render(<Form onGetRecommendations={mockOnGetRecommendations} />);
    
    const selectButton = screen.getByText('Select Type');
    fireEvent.click(selectButton);

    expect(mockHandleChange).toHaveBeenCalledWith('selectedRecommendationType', 'SingleProduct');
  });

  it('Deve lidar com erros na aplicação de filtros', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockGetRecommendations.mockImplementation(() => {
      throw new Error('Test error');
    });

    render(<Form onGetRecommendations={mockOnGetRecommendations} />);
    
    const applyButton = screen.getByTestId('aplicar-filtros');
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao aplicar filtros:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
