import React from 'react';

const variants = {
  primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 shadow-md hover:shadow-lg',
  secondary: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400',
}


function Button({ text, onClick, disabled = false, variant = 'primary',}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${variants[variant]} py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2`}
    >
      <span>{text}</span>
    </button>
  )
}

export default Button;
