import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold">
              Encontre a solução perfeita para seu negócio
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-blue-100 font-light">
            Descubra produtos RD Station personalizados para suas necessidades específicas
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
