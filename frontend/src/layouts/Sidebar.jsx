import React from 'react';
import { NavLink } from 'react-router-dom';
import { Coffee, ShoppingBag, PieChart, Settings, LogOut } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import './Sidebar.css';

export default function Sidebar() {
  const can = useAuthStore(state => state.can);

  const navItems = [
    { name: 'POS', icon: Coffee, path: '/', permission: 'create_order' },
    { name: 'Orders', icon: ShoppingBag, path: '/orders', permission: 'view_orders' },
    { name: 'Analytics', icon: PieChart, path: '/analytics', permission: 'view_reports' },
    { name: 'Settings', icon: Settings, path: '/settings', permission: 'manage_users' },
  ];

  const visibleItems = navItems.filter(item => can(item.permission));

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">☕</div>
        <h2>BrewPOS</h2>
      </div>
      
      <nav className="sidebar-nav">
        {visibleItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={() => useAuthStore.getState().setUser(null)}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
