
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface Settings {
  studioName: string;
  locations: any[];
  pricing: any[];
  socialMedia: any[];
  enableBlog: boolean;
  enableShop: boolean;
  landingPageImage: string;
  classes: any[];
  hasMultipleLocations: boolean;
  currentLocation: any;
  stripeConnected: boolean;
}

interface SettingsContextProps {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const defaultSettings: Settings = {
  studioName: '',
  locations: [],
  pricing: [],
  socialMedia: [],
  enableBlog: false,
  enableShop: false,
  landingPageImage: '',
  classes: [],
  hasMultipleLocations: false,
  currentLocation: null,
  stripeConnected: false,
};

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSettings = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'settings', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setSettings({ ...defaultSettings, ...docSnap.data() as Settings });
          }
        } catch (err) {
          console.error('Error fetching settings:', err);
          setError('Failed to load settings. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchSettings();
  }, [user]);

  const updateSettings = async (newSettings: Partial<Settings>) => {
    if (user) {
      try {
        setIsLoading(true);
        setError(null);
        const updatedSettings = { ...settings, ...newSettings };
        await setDoc(doc(db, 'settings', user.uid), updatedSettings);
        setSettings(updatedSettings);
        console.log('Settings updated successfully');
      } catch (err: any) {
        console.error('Error updating settings:', err);
        setError(`Failed to update settings: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isLoading, error }}>
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
