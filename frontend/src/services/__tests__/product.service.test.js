import productService from '../product.service';
import axios from 'axios';

jest.mock('axios', () => ({
  get: jest.fn()
}));


describe('product.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Retorna lista de produtos quando a requisição é bem-sucedida', async () => {
    const mockProducts = [
      { id: 1, name: 'RD Station Marketing' },
      { id: 2, name: 'RD Station CRM' },
    ];

    axios.get.mockResolvedValue({
      data: mockProducts,
    });

    const result = await productService.getProducts();

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProducts);
  });

  test('Lança erro quando a requisição falha', async () => {
    const mockError = new Error('Network Error');
    
    const axios = require('axios');
    axios.get.mockRejectedValue(mockError);

    // Mock do console.error para evitar logs durante os testes
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(productService.getProducts()).rejects.toThrow('Network Error');
    
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/products');
    expect(consoleSpy).toHaveBeenCalledWith('Erro ao obter os produtos:', mockError);
    
    consoleSpy.mockRestore();
  });

  test('Retorna array vazio quando a API retorna array vazio', async () => {
    const axios = require('axios');
    axios.get.mockResolvedValue({
      data: [],
    });

    const result = await productService.getProducts();

    expect(result).toEqual([]);
    expect(Array.isArray(result)).toBe(true);
  });
});
