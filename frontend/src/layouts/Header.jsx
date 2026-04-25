import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, User, MonitorPlay, ChevronDown } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import useUIStore from '../store/useUIStore';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const { user, setUser } = useAuthStore();
  const { searchQuery, setSearchQuery } = useUIStore();
  const [showRoleSelect, setShowRoleSelect] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isPosPage = location.pathname === '/';

  return (
    <header className="header">
      {isPosPage && (
        <div className="header-search">
          <Search size={20} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search menu, categories..." 
            className="search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      )}

      <div className="header-right">
        <div className="pos-time">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          <span className="date"> • {time.toLocaleDateString()}</span>
        </div>
        
        <button 
          className="icon-btn notification-btn" 
          onClick={() => window.open('/customer', 'CustomerDisplay', 'width=1024,height=768')}
          title="Open Customer Display"
        >
          <MonitorPlay size={20} />
        </button>

        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>

        <div className="user-profile-container">
          <div className="user-profile" onClick={() => setShowRoleSelect(!showRoleSelect)}>
            <div className="avatar">
              <User size={18} />
            </div>
            <div className="user-info">
              <span className="name">{user.name}</span>
              <span className="role">{user.role}</span>
            </div>
            <ChevronDown size={16} className="dropdown-icon" />
          </div>

          {showRoleSelect && (
            <div className="role-dropdown">
              <div className="role-option" onClick={() => {
                localStorage.removeItem('token');
                setUser(null);
                setShowRoleSelect(false);
              }}>
                <strong>Log Out</strong>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
