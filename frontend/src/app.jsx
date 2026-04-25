import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import useAuthStore from './store/useAuthStore';
import useSettings from './store/useSettings';

function App() {
  const { user, setUser, can } = useAuthStore();
  const { fetchSettings } = useSettings();
  const location = useLocation();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsInitializing(false);
        return;
      }
      
      try {
        // Fetch Auth and Settings in parallel
        const [authRes, settingsRes] = await Promise.all([
          fetch('http://localhost:5000/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetchSettings()
        ]);

        if (authRes.ok) {
          const data = await authRes.json();
          const userData = {
            ...data.user,
            name: data.user.username.charAt(0).toUpperCase() + data.user.username.slice(1)
          };
          setUser(userData);
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Failed to verify auto-login:', err);
      } finally {
        setIsInitializing(false);
      }
    };

    if (!user) {
      initAuth();
    } else {
      setIsInitializing(false);
    }
  }, [user, setUser, fetchSettings]);

  if (isInitializing) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>Authenticating...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (location.pathname === '/' && !can('create_order')) {
    return <Navigate to="/orders" replace />;
  }
  if (location.pathname === '/analytics' && !can('view_reports')) {
    return <Navigate to="/" replace />;
  }
  if (location.pathname === '/settings' && !can('manage_users')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-container">
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
}

export default App;
