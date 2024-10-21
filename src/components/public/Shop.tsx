
import React from 'react';
import { config } from '../../config';

const Shop: React.FC = () => {
  if (!config.enableShop) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Shop</h2>
      {/* Implement shop items here */}
    </div>
  );
};

export default Shop;
