
import React from 'react';
import { config } from '../../config';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src={config.landingPageImage}
          alt="Yoga studio"
        />
        <div className="absolute inset-0 bg-gray-500 mix-blend-multiply" aria-hidden="true" />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {config.studioName}
        </h1>
        <p className="mt-6 text-xl text-white max-w-3xl">
          Discover inner peace and physical well-being through our transformative yoga classes.
          Join our community and embark on a journey of self-discovery and holistic health.
        </p>
        <div className="mt-10 flex space-x-4">
          <Link
            to="/schedule"
            className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
          >
            View Class Schedule
          </Link>
          <Link
            to="/admin"
            className="inline-block bg-indigo-600 py-3 px-8 border border-transparent rounded-md text-base font-medium text-white hover:bg-indigo-700"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
