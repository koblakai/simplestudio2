
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Settings as SettingsIcon, Calendar, BookOpen, ShoppingBag, Home, LogOut, Users, UserPlus, Globe, ChevronDown, ChevronUp, ExternalLink, Server, Image, CreditCard } from 'lucide-react';
import Dashboard from './Dashboard';
import Classes from './Classes';
import Settings from './Settings';
import Blog from './Blog';
import Shop from './Shop';
import Members from './Members';
import StaffManagement from './StaffManagement';
import HostingOptions from './HostingOptions';
import NetlifyOAuth from './NetlifyOAuth';
import LandingPageCustomization from './LandingPageCustomization';
import StripeConnect from './StripeConnect';
import { useAuth } from '../../contexts/AuthContext';
import { useSettings } from '../../contexts/SettingsContext';

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const { settings, updateSettings } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const [isWebsiteDropdownOpen, setIsWebsiteDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if the user was redirected from Stripe
    const urlParams = new URLSearchParams(location.search);
    const stripeConnected = urlParams.get('stripe_connected');
    
    if (stripeConnected === 'true') {
      // Update settings to reflect Stripe connection
      updateSettings({ ...settings, stripeConnected: true });
      // Remove the query parameter
      navigate('/admin', { replace: true });
    }
  }, [location, settings, updateSettings, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="flex-grow">
          <Link to="/admin" className="flex items-center px-4 py-2 hover:bg-gray-100">
            <Home className="mr-2" size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/classes" className="flex items-center px-4 py-2 hover:bg-gray-100">
            <Calendar className="mr-2" size={20} />
            <span>Classes</span>
          </Link>
          <Link to="/admin/members" className="flex items-center px-4 py-2 hover:bg-gray-100">
            <Users className="mr-2" size={20} />
            <span>Members</span>
          </Link>
          <Link to="/admin/staff" className="flex items-center px-4 py-2 hover:bg-gray-100">
            <UserPlus className="mr-2" size={20} />
            <span>Staff</span>
          </Link>
          <Link to="/admin/blog" className="flex items-center px-4 py-2 hover:bg-gray-100">
            <BookOpen className="mr-2" size={20} />
            <span>Blog</span>
          </Link>
          <Link to="/admin/shop" className="flex items-center px-4 py-2 hover:bg-gray-100">
            <ShoppingBag className="mr-2" size={20} />
            <span>Shop</span>
          </Link>
          <Link to="/admin/settings" className="flex items-center px-4 py-2 hover:bg-gray-100">
            <SettingsIcon className="mr-2" size={20} />
            <span>Settings</span>
          </Link>
          <Link to="/admin/landing-page" className="flex items-center px-4 py-2 hover:bg-gray-100">
            <Image className="mr-2" size={20} />
            <span>Landing Page</span>
          </Link>
          <Link
            to="/admin/stripe-connect"
            className={`flex items-center px-4 py-2 hover:bg-gray-100 ${
              settings.stripeConnected ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <CreditCard className="mr-2" size={20} />
            <span>Connect to Stripe</span>
          </Link>
          
          {/* Website Dropdown */}
          <div className="px-4 py-2">
            <button
              onClick={() => setIsWebsiteDropdownOpen(!isWebsiteDropdownOpen)}
              className="flex items-center w-full text-left hover:bg-gray-100"
            >
              <Globe className="mr-2" size={20} />
              <span>Website</span>
              {isWebsiteDropdownOpen ? <ChevronUp className="ml-auto" size={16} /> : <ChevronDown className="ml-auto" size={16} />}
            </button>
            {isWebsiteDropdownOpen && (
              <div className="ml-6 mt-2 space-y-2">
                <a href={`https://${settings.customDomain || 'your-default-domain.com'}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:bg-gray-100 px-2 py-1 rounded">
                  <ExternalLink className="mr-2" size={16} />
                  <span>Visit Website</span>
                </a>
                <Link to="/admin/hosting" className="flex items-center hover:bg-gray-100 px-2 py-1 rounded">
                  <Server className="mr-2" size={16} />
                  <span>Hosting Options</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="flex items-center px-4 py-2 mt-auto mb-4 hover:bg-gray-100">
          <LogOut className="mr-2" size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/members" element={<Members />} />
            <Route path="/staff" element={<StaffManagement />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/hosting" element={<HostingOptions />} />
            <Route path="/netlify-oauth" element={<NetlifyOAuth />} />
            <Route path="/landing-page" element={<LandingPageCustomization />} />
            <Route path="/stripe-connect" element={<StripeConnect />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
