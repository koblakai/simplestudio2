
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout';
import PublicLayout from './components/public/PublicLayout';
import Login from './components/auth/Login';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <AuthProvider>
          <SettingsProvider>
            <Router>
              <Routes>
                <Route path="/*" element={<PublicLayout />} />
                <Route
                  path="/admin/*"
                  element={
                    user ? <AdminLayout /> : <Navigate to="/login" replace />
                  }
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Router>
          </SettingsProvider>
        </AuthProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
