import React from 'react';
import Checkbox from '../../shared/Checkbox';
import useRecommendations from '../../../hooks/useRecommendations';
import RECOMMENDATION_TYPE from '../../../enum/recommendationType.enum';

const { SINGLE_PRODUCT, MULTIPLE_PRODUCTS } = RECOMMENDATION_TYPE;

function RecommendationType({ onRecommendationTypeChange }) {
  const { defaultRecommendationType } = useRecommendations();

  const isDefaultChecked = (type) => {
    return type === defaultRecommendationType;
  }

  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Tipo de Recomendação:</h2>
      <div className="flex items-center">
        <Checkbox
          id="SingleProduct"
          type="radio"
          name="recommendationType"
          defaultChecked={isDefaultChecked(SINGLE_PRODUCT)}
          value={SINGLE_PRODUCT}
          onChange={() => onRecommendationTypeChange(SINGLE_PRODUCT)}
          className="mr-2"
        />
        <label htmlFor="SingleProduct" className="mr-4">Produto Único</label>
        <Checkbox
          id="MultipleProducts"
          type="radio"
          name="recommendationType"
          defaultChecked={isDefaultChecked(MULTIPLE_PRODUCTS)}
          value={MULTIPLE_PRODUCTS}
          onChange={() => onRecommendationTypeChange(MULTIPLE_PRODUCTS)}
          className="mr-2"
        />
        <label htmlFor="MultipleProducts">Múltiplos Produtos</label>
      </div>
    </div>
  );
}

export default RecommendationType;
