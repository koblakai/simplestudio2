
import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

const Dashboard: React.FC = () => {
  const { settings } = useSettings();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p>Welcome to {settings.studioName} admin dashboard.</p>
      {/* Add dashboard widgets and statistics here */}
    </div>
  );
};

export default Dashboard;
