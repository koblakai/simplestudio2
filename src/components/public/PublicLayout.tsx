
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import ClassSchedule from './ClassSchedule';
import Pricing from './Pricing';
import Blog from './Blog';
import Shop from './Shop';
import { useSettings } from '../../contexts/SettingsContext';

const PublicLayout: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">{settings.studioName}</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </Link>
                <Link to="/classes" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Classes
                </Link>
                <Link to="/pricing" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Pricing
                </Link>
                {settings.enableBlog && (
                  <Link to="/blog" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Blog
                  </Link>
                )}
                {settings.enableShop && (
                  <Link to="/shop" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Shop
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<ClassSchedule />} />
          <Route path="/pricing" element={<Pricing />} />
          {settings.enableBlog && <Route path="/blog" element={<Blog />} />}
          {settings.enableShop && <Route path="/shop" element={<Shop />} />}
        </Routes>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {settings.socialMedia.map((item) => (
              <a key={item.platform} href={item.url} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.platform}</span>
                {/* Add social media icons here */}
              </a>
            ))}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} {settings.studioName}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
