import React from 'react';

const ErrorScreen = ({ error }) => {
  return (
    <div className="text-center py-16">
      <div className="mb-6">
        <span className="text-6xl">⚠️</span>
      </div>
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Erro ao carregar produtos
      </h2>
      <p className="text-gray-600 mb-8">
        {error}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Tentar Novamente
      </button>
    </div>
  );
};

export default ErrorScreen;