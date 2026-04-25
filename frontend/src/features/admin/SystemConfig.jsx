import React, { useState, useEffect } from 'react';
import { Store, Moon, Percent, Printer, MonitorPlay, Save, CheckCircle, Smartphone } from 'lucide-react';
import useSettings from '../../store/useSettings';

export default function SystemConfig() {
  const { settings, updateSettings, fetchSettings } = useSettings();
  const [localConfig, setLocalConfig] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    setLocalConfig(settings);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost:5000/api/settings', {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify(localConfig)
      });
      if (response.ok) {
        updateSettings(localConfig);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert('Failed to save settings');
      }
    } catch (err) {
      alert('Network error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    padding: '0.65rem 0.85rem',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    width: '100%',
    outline: 'none',
    fontSize: '0.9rem',
    marginTop: '0.4rem',
    transition: 'border-color 0.2s',
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <div 
      onClick={onChange}
      style={{ 
        width: '42px', 
        height: '22px', 
        background: checked ? 'var(--accent-color)' : 'var(--border-color)', 
        borderRadius: '11px', 
        position: 'relative',
        cursor: 'pointer',
        transition: 'background 0.3s'
      }}
    >
      <div style={{ 
        position: 'absolute', 
        left: checked ? '22px' : '2px', 
        top: '2px', 
        width: '18px', 
        height: '18px', 
        background: 'white', 
        borderRadius: '50%',
        transition: 'left 0.3s',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}></div>
    </div>
  );

  const SectionCard = ({ title, icon, children }) => (
    <div style={{ 
      background: 'var(--bg-secondary)', 
      padding: '1.25rem', 
      borderRadius: '12px', 
      border: '1px solid var(--border-color)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ 
        margin: '0 0 1.25rem 0', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.6rem', 
        fontSize: '1rem', 
        color: 'var(--text-primary)',
        fontWeight: '600'
      }}>
        {icon} {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {children}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingBottom: '1.5rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', margin: '0 0 0.25rem 0' }}>System Config</h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Manage core point-of-sale settings, tax algorithms, and hardware toggles.</p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={saving}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.65rem 1.25rem', 
            background: showSuccess ? '#10b981' : 'var(--accent-color)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            cursor: saving ? 'wait' : 'pointer', 
            fontWeight: '600',
            fontSize: '0.9rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
            transition: 'all 0.2s' 
          }}
        >
          {saving ? 'Saving...' : showSuccess ? <><CheckCircle size={16} /> Saved</> : <><Save size={16} /> Save Settings</>}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        
        <SectionCard title="Store Profile" icon={<Store size={18} color="var(--accent-color)" />}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Store Name</label>
            <input 
              style={inputStyle} 
              value={localConfig.storeName} 
              onChange={e => setLocalConfig({...localConfig, storeName: e.target.value})} 
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Currency Type</label>
            <select style={{...inputStyle, cursor: 'pointer'}} value={localConfig.currency} onChange={e => setLocalConfig({...localConfig, currency: e.target.value})}>
              <option value="USD ($)">USD ($)</option>
              <option value="EUR (€)">EUR (€)</option>
              <option value="GBP (£)">GBP (£)</option>
            </select>
          </div>
        </SectionCard>

        <SectionCard title="Tax & Accounting" icon={<Percent size={18} color="var(--accent-color)" />}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Default Sales Tax (%)</label>
            <input 
              type="number"
              step="0.1"
              style={inputStyle} 
              value={localConfig.taxRate} 
              onChange={e => setLocalConfig({...localConfig, taxRate: e.target.value})} 
            />
          </div>
          <div style={{ marginTop: '0.25rem', padding: '0.75rem', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <span style={{ fontSize: '0.8rem', color: '#d97706', lineHeight: '1.4', display: 'block' }}>
              <strong>Note:</strong> Changing the tax rate will instantly affect all new orders globally across all terminals.
            </span>
          </div>
        </SectionCard>

        <SectionCard title="Hardware & Interface" icon={<MonitorPlay size={18} color="var(--accent-color)" />}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '500', fontSize: '0.95rem' }}>Dark Mode Theme</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Use low-light interface for all terminals.</div>
            </div>
            <ToggleSwitch checked={localConfig.darkMode} onChange={() => setLocalConfig({...localConfig, darkMode: !localConfig.darkMode})} />
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.25rem 0' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '500', fontSize: '0.95rem' }}>Customer Display Screen</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sync cart state to customer-facing tablet.</div>
            </div>
            <ToggleSwitch checked={localConfig.customerDisplay} onChange={() => setLocalConfig({...localConfig, customerDisplay: !localConfig.customerDisplay})} />
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.25rem 0' }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: '500', fontSize: '0.95rem' }}>Auto-Print Receipts</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Send immediately to thermal printer.</div>
            </div>
            <ToggleSwitch checked={localConfig.autoPrint} onChange={() => setLocalConfig({...localConfig, autoPrint: !localConfig.autoPrint})} />
          </div>
        </SectionCard>

      </div>
    </div>
  );
}
