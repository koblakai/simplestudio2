
import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

const AdminShop: React.FC = () => {
  const { settings } = useSettings();

  if (!settings.enableShop) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Shop Management</h2>
      {/* Implement product management UI here */}
    </div>
  );
};

export default AdminShop;
