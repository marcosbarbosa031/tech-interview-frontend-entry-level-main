import React from 'react';
import Checkbox from '../../shared/Checkbox';
import RECOMMENDATION_TYPE from '../../../enum/recommendationType.enum';

const { SINGLE_PRODUCT, MULTIPLE_PRODUCTS } = RECOMMENDATION_TYPE;

function RecommendationType({ recommendationType, onRecommendationTypeChange }) {

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Tipo de Recomendação</h3>
      </div>
      <div className="flex flex-col space-y-3 bg-gray-50 rounded-lg p-4">
        <div className='flex'>
          <Checkbox
            id="SingleProduct"
            type="radio"
            name="recommendationType"
            checked={recommendationType === SINGLE_PRODUCT}
            value={SINGLE_PRODUCT}
            onChange={() => onRecommendationTypeChange(SINGLE_PRODUCT)}
            className="mr-2"
          />
          <label htmlFor="SingleProduct" className="mr-4">Produto Único</label>
        </div>
        <div className='flex'>
            <Checkbox
            id="MultipleProducts"
            type="radio"
            name="recommendationType"
            checked={recommendationType === MULTIPLE_PRODUCTS}
            value={MULTIPLE_PRODUCTS}
            onChange={() => onRecommendationTypeChange(MULTIPLE_PRODUCTS)}
            className="mr-2"
          />
          <label htmlFor="MultipleProducts">Múltiplos Produtos</label>
        </div>
      </div>
    </div>
  );
}

export default RecommendationType;
