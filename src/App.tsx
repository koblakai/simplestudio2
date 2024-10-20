
import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import PublicLayout from './components/public/PublicLayout';
import Login from './components/auth/Login';
import { useAuth } from './contexts/AuthContext';
import SimpleStudioOffering from './components/marketing/SimpleStudioOffering';
import SimpleStudioOnboarding from './components/onboarding/SimpleStudioOnboarding';
import ErrorBoundary from './components/ErrorBoundary';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';

function App() {
  const { user, loading, error } = useAuth();
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    const handleSettingsUpdate = () => {
      // Force a re-render of the entire app
      updateSettings({ ...settings });
    };

    window.addEventListener('settings-updated', handleSettingsUpdate);

    return () => {
      window.removeEventListener('settings-updated', handleSettingsUpdate);
    };
  }, [settings, updateSettings]);

  console.log('Rendering App component', { user, loading, error });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <SettingsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<SimpleStudioOffering />} />
              <Route path="/demo/*" element={<PublicLayout />} />
              <Route 
                path="/admin/*" 
                element={
                  user ? <AdminLayout /> : <Navigate to="/login" replace />
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SimpleStudioOnboarding />} />
              {/* Catch-all route for public layout */}
              <Route path="*" element={<PublicLayout />} />
            </Routes>
          </Router>
        </SettingsProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
