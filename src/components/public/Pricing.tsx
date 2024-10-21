
import React from 'react';
import { config } from '../../config';

const Pricing: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your yoga journey
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {config.pricing.map((plan, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
              {/* Implement pricing plan details here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
