import RecomendationTypeEnum from "../enum/recommendationType.enum";

const {SINGLE_PRODUCT, MULTIPLE_PRODUCTS} = RecomendationTypeEnum

const isArrayEmpty = (array) => Array.isArray(array) && array.length === 0;

const hasNoProducts = (products) => !products || isArrayEmpty(products);

const hasNoFilters = (selectedPreferences, selectedFeatures) => 
  isArrayEmpty(selectedPreferences) && isArrayEmpty(selectedFeatures);


const matchesPreferences = (product, selectedPreferences) => {
  if (isArrayEmpty(selectedPreferences)) {
    return true;
  }
  
  if (!product.preferences || isArrayEmpty(product.preferences)) {
    return false;
  }
  
  return selectedPreferences.some(selectedPref => 
    product.preferences.includes(selectedPref)
  );
};

const matchesFeatures = (product, selectedFeatures) => {
  if (isArrayEmpty(selectedFeatures)) {
    return true;
  }
  
  if (!product.features || isArrayEmpty(product.features)) {
    return false;
  }
  
  return selectedFeatures.some(selectedFeature => 
    product.features.includes(selectedFeature)
  );
};

const applyFilters = (product, filters) => {
  const { selectedPreferences, selectedFeatures } = filters;
  
  return matchesPreferences(product, selectedPreferences) && 
         matchesFeatures(product, selectedFeatures);
};

const filterProducts = (products, filters) => {
  const { selectedPreferences, selectedFeatures } = filters;
  
  if (hasNoFilters(selectedPreferences, selectedFeatures)) {
    return products;
  }
  
  return products.filter(product => applyFilters(product, filters));
};

const getSingleProductRecommendation = (filteredProducts) => {
  if (isArrayEmpty(filteredProducts)) {
    return [];
  }
  
  return filteredProducts.slice(-1);
};

const getMultipleProductsRecommendation = (filteredProducts) => {
  return filteredProducts || [];
};

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
    selectedRecommendationType,
  }, products) => {
    if (hasNoProducts(products)) return [];

    const filters = { selectedPreferences, selectedFeatures };
    
    const filteredProducts = filterProducts(products, filters);
    const recommendations = applyRecommendationStrategy(filteredProducts, selectedRecommendationType);
    
    return recommendations;
  },
};

export default recommendationService;
