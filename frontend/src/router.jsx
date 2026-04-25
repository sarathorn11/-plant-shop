import { createBrowserRouter } from 'react-router-dom';
import App from './app.jsx';
import POSPage from './pages/POSPage';
import OrdersPage from './pages/OrdersPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import CustomerDisplayPage from './pages/CustomerDisplayPage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <POSPage />,
      },
      {
        path: '/orders',
        element: <OrdersPage />
      },
      {
        path: '/analytics',
        element: <AnalyticsPage />
      },
      {
        path: '/settings',
        element: <SettingsPage />
      }
    ]
  },
  {
    path: '/customer',
    element: <CustomerDisplayPage />
  }
]);

export default router;
