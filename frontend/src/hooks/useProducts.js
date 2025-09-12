import { useEffect, useState, useCallback } from 'react';
import productService from '../services/product.service';

const useProducts = () => {
  const [preferences, setPreferences] = useState([]);
  const [features, setFeatures] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const products = await productService.getProducts();
      const allPreferences = [];
      const allFeatures = [];

      setProducts(products);

      products.forEach((product) => {
        const productPreferences = product.preferences
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);
        allPreferences.push(...productPreferences);

        const productFeatures = product.features
          .sort(() => Math.random() - 0.5)
          .slice(0, 2);
        allFeatures.push(...productFeatures);
      });

      setPreferences(allPreferences);
      setFeatures(allFeatures);
    } catch (error) {
      console.error('Erro ao obter os produtos:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [ setPreferences, setFeatures, setProducts ]);

  useEffect(() => {
    fetchData();
  }, [ fetchData ]);

  return { preferences, features, products, loading, error };
};

export default useProducts;
