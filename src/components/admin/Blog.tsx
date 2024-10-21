
import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

const AdminBlog: React.FC = () => {
  const { settings } = useSettings();

  if (!settings.enableBlog) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Blog Management</h2>
      {/* Implement blog post management UI here */}
    </div>
  );
};

export default AdminBlog;
