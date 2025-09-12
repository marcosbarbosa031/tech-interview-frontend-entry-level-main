import axios from 'axios';

const baseURL = 'http://localhost:3001';

/**
 * Serviço de produtos
 */
const productService = {
  /**
   * Obtém os produtos do backend
   * @returns {Promise<Array>} - Array de produtos
   */
  getProducts: async () => {
    try {
      const response = await axios.get(`${baseURL}/products`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter os produtos:', error);
      throw error;
    }
  }
};

export default productService;
