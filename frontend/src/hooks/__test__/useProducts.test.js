import { renderHook, waitFor } from '@testing-library/react';
import useProducts from '../useProducts';
import productService from '../../services/product.service';
import mockProducts from '../../mocks/mockProducts';

jest.mock('../../services/product.service');

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    Math.random.mockRestore();
  });

  it('Deve inicializar com estado de carregamento', async() => {
    productService.getProducts.mockResolvedValue(mockProducts);

    const { result, unmount } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.products).toEqual([]);
    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);

    unmount();
  });


  it('Deve buscar produtos com sucesso e extrair preferências e funcionalidades', async () => {
    productService.getProducts.mockResolvedValue(mockProducts);

    const { result, unmount } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.preferences).toHaveLength(8); // 4 produtos x 2 preferências cada
    expect(result.current.features).toHaveLength(8); // 4 produtos x 2 features cada
    expect(result.current.error).toBe(null);

    unmount();
  });

  it('Deve lidar com erro quando busca de produtos falha', async () => {
    const errorMessage = 'Failed to fetch products';
    productService.getProducts.mockRejectedValue(new Error(errorMessage));

    const { result, unmount } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.products).toEqual([]);
    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);

    unmount();
  });

  it('Deve chamar productService.getProducts na montagem', async () => {
    productService.getProducts.mockResolvedValue(mockProducts);

    const { unmount } = renderHook(() => useProducts());

    expect(productService.getProducts).toHaveBeenCalledTimes(1);

    unmount();
  });

  it('Deve lidar com array de produtos vazio', async () => {
    productService.getProducts.mockResolvedValue([]);

    const { result, unmount } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);
    expect(result.current.error).toBe(null);

    unmount();
  });

  it('Deve lidar com produtos sem preferências ou funcionalidades', async () => {
    const productsWithoutData = [
      { id: 1, name: 'Product 1', preferences: [], features: [] }
    ];
    productService.getProducts.mockResolvedValue(productsWithoutData);

    const { result, unmount } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(productsWithoutData);
    expect(result.current.preferences).toEqual([]);
    expect(result.current.features).toEqual([]);

    unmount();
  });

  it('Deve definir loading como false após busca bem-sucedida', async () => {
    productService.getProducts.mockResolvedValue(mockProducts);

    const { result, unmount } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    unmount();
  });
});
