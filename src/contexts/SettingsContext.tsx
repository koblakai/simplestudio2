
import React, { createContext, useContext, useState, useEffect } from 'react';
import { config } from '../config';

interface SettingsContextProps {
  settings: any;
  updateSettings: (newSettings: any) => void;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState<any>(config);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate fetching settings from a server or local storage
    setTimeout(() => {
      setSettings(config);
      setIsLoading(false);
    }, 1000);
  }, []);

  const updateSettings = (newSettings: any) => {
    setSettings(newSettings);
    // Optionally, save the new settings to a server or local storage
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
