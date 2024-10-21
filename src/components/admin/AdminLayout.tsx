
import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Classes from './Classes';
import Members from './Members';
import Settings from './Settings';
import Blog from './Blog';
import Shop from './Shop';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../contexts/SettingsContext';

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
            <Link to="/admin/classes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Classes</Link>
            <Link to="/admin/members" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Members</Link>
            <Link to="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
            {settings.enableBlog && (
              <Link to="/admin/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Blog</Link>
            )}
            {settings.enableShop && (
              <Link to="/admin/shop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Shop</Link>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/members" element={<Members />} />
            <Route path="/settings" element={<Settings />} />
            {settings.enableBlog && <Route path="/blog" element={<Blog />} />}
            {settings.enableShop && <Route path="/shop" element={<Shop />} />}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
