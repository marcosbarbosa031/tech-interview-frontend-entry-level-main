import RECOMMENDATION_TYPE from "../enum/recommendationType.enum";

const {SINGLE_PRODUCT, MULTIPLE_PRODUCTS} = RECOMMENDATION_TYPE

/**
 * Verifica se um array não está vazio
 * @param {Array} array - Array a ser verificado
 * @returns {boolean} - true se o array está vazio, false caso contrário
 */
const isArrayEmpty = (array) => Array.isArray(array) && array.length === 0;

/**
 * Verifica se não há produtos disponíveis
 * @param {Array} products - Array de produtos a ser verificado
 * @returns {boolean} - true se não há produtos disponíveis, false caso contrário
 */
const hasNoProducts = (products) => !products || isArrayEmpty(products);

/**
 * Verifica se nenhum filtro foi aplicado
 * @param {Array} selectedPreferences - Array de preferências selecionadas
 * @param {Array} selectedFeatures - Array de funcionalidades selecionadas
 * @returns {boolean} - true se nenhum filtro foi aplicado, false caso contrário
 */
const hasNoFilters = (selectedPreferences, selectedFeatures) => 
  isArrayEmpty(selectedPreferences) && isArrayEmpty(selectedFeatures);


/**
 * Verifica se um produto atende às preferências selecionadas
 * @param {Object} product - Produto a ser verificado
 * @param {Array} selectedPreferences - Array de preferências selecionadas
 * @returns {boolean} - true se o produto atende às preferências selecionadas, false caso contrário
 */
const matchesPreferences = (product, selectedPreferences) => {
  if (isArrayEmpty(selectedPreferences)) {
    return true; // Se não há preferências selecionadas, produto atende
  }
  
  if (!product.preferences || isArrayEmpty(product.preferences)) {
    return false; // Produto sem preferências não atende quando há filtro
  }
  
  return selectedPreferences.some(selectedPref => 
    product.preferences.includes(selectedPref)
  );
};

/**
 * Verifica se um produto atende às funcionalidades selecionadas
 * @param {Object} product - Produto a ser verificado
 * @param {Array} selectedFeatures - Array de funcionalidades selecionadas
 * @returns {boolean} - true se o produto atende às funcionalidades selecionadas, false caso contrário
 */
const matchesFeatures = (product, selectedFeatures) => {
  if (isArrayEmpty(selectedFeatures)) {
    return true; // Se não há funcionalidades selecionadas, produto atende
  }
  
  if (!product.features || isArrayEmpty(product.features)) {
    return false; // Produto sem funcionalidades não atende quando há filtro
  }
  
  return selectedFeatures.some(selectedFeature => 
    product.features.includes(selectedFeature)
  );
};

/**
 * Aplica todos os filtros a um produto
 * @param {Object} product - Produto a ser verificado
 * @param {Object} filters - Filtros aplicados
 * @returns {boolean} - true se o produto atende aos filtros, false caso contrário
 */
const applyFilters = (product, filters) => {
  const { selectedPreferences, selectedFeatures } = filters;
  
  return matchesPreferences(product, selectedPreferences) && 
         matchesFeatures(product, selectedFeatures);
};

/**
 * Filtra a lista de produtos baseado nos critérios selecionados
 * @param {Array} products - Array de produtos a ser filtrado
 * @param {Object} filters - Filtros aplicados
 * @returns {Array} - Array de produtos filtrados
 */
const filterProducts = (products, filters) => {
  const { selectedPreferences, selectedFeatures } = filters;
  
  // Se não há filtros, retorna todos os produtos
  if (hasNoFilters(selectedPreferences, selectedFeatures)) {
    return products;
  }
  
  return products.filter(product => applyFilters(product, filters));
};

/**
 * Estratégia para recomendação de produto único
 * Retorna um array com um único produto.
 * Em caso de múltiplos produtos, retorna o último.
 * @param {Array} filteredProducts - Array de produtos filtrados
 * @returns {Array} - Array de produtos recomendados
 */
const getSingleProductRecommendation = (filteredProducts) => {
  if (isArrayEmpty(filteredProducts)) {
    return [];
  }
  
  return filteredProducts.slice(-1);
};

/**
 * Estratégia para recomendação de múltiplos produtos
 * Retorna todos os produtos filtrados.
 * @param {Array} filteredProducts - Array de produtos filtrados
 * @returns {Array} - Array de produtos recomendados
 */
const getMultipleProductsRecommendation = (filteredProducts) => {
  return filteredProducts || [];
};

/**
 * Aplica a estratégia de recomendação baseada no tipo selecionado
 * @param {Array} filteredProducts - Array de produtos filtrados
 * @param {string} recommendationType - Tipo de recomendação
 * @returns {Array} - Array de produtos recomendados
 */
const applyRecommendationStrategy = (filteredProducts, recommendationType) => {
  const strategies = {
    [SINGLE_PRODUCT]: getSingleProductRecommendation,
    [MULTIPLE_PRODUCTS]: getMultipleProductsRecommendation,
  };
  
  const strategy = strategies[recommendationType] || getMultipleProductsRecommendation;
  return strategy(filteredProducts);
};

/**
 * Serviço de recomendações de produtos
 */
const recommendationService = {
  /**
   * Obtém recomendações de produtos baseado nos critérios do formulário
   * @param {Object} formData - Dados do formulário
   * @param {string[]} formData.selectedPreferences - Preferências selecionadas
   * @param {string[]} formData.selectedFeatures - Funcionalidades selecionadas
   * @param {string} formData.selectedRecommendationType - Tipo de recomendação
   * @param {Array} products - Lista de produtos disponíveis
   * @returns {Array} Lista de produtos recomendados
   */
  getRecommendations: ({
    selectedPreferences = [],
    selectedFeatures = [],
    selectedRecommendationType = MULTIPLE_PRODUCTS
  }, products) => {
    if (hasNoProducts(products)) return [];

    const filters = { selectedPreferences, selectedFeatures };
    
    const filteredProducts = filterProducts(products, filters);
    const recommendations = applyRecommendationStrategy(
      filteredProducts, 
      selectedRecommendationType
    );
    
    return recommendations;
  },
};

export default recommendationService;
