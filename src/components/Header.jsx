import React from 'react';

const Header = () => {
  return (
    <header className="flex bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md justify-center items-center py-4">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Shinobi AI</h1>
            <p className="">Stable Diffusion Model</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
