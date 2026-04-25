import React, { useState } from 'react';
import MenuManagement from '../features/admin/MenuManagement';
import UserManagement from '../features/admin/UserManagement';
import SystemConfig from '../features/admin/SystemConfig';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('system');

  const tabStyle = (isActive) => ({
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    background: isActive ? 'var(--accent-color)' : 'transparent',
    color: isActive ? 'white' : 'var(--text-color)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    fontWeight: isActive ? '600' : 'normal',
    transition: 'all 0.2s'
  });

  return (
    <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2>Admin Dashboard</h2>
      
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <button onClick={() => setActiveTab('system')} style={tabStyle(activeTab === 'system')}>System Config</button>
        <button onClick={() => setActiveTab('menu')} style={tabStyle(activeTab === 'menu')}>Menu Items</button>
        <button onClick={() => setActiveTab('staff')} style={tabStyle(activeTab === 'staff')}>Staff Accounts</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
        {activeTab === 'system' && <SystemConfig />}
        {activeTab === 'menu' && <MenuManagement />}
        {activeTab === 'staff' && <UserManagement />}
      </div>
    </div>
  );
}
