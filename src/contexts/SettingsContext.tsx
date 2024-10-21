
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

interface SettingsContextType {
  settings: any;
  updateSettings: (newSettings: any) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC = ({ children }) => {
  const [settings, setSettings] = useState<any>({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchSettings = async () => {
      if (user) {
        const docRef = doc(db, 'settings', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings(docSnap.data());
        }
      }
    };

    fetchSettings();
  }, [user]);

  const updateSettings = async (newSettings: any) => {
    if (user) {
      await setDoc(doc(db, 'settings', user.uid), newSettings);
      setSettings(newSettings);
    }
  };

  const value = { settings, updateSettings };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
