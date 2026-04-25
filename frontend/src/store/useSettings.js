import { create } from 'zustand';

const useSettings = create((set, get) => ({
  settings: {
    storeName: 'BrewPOS',
    taxRate: '10.0',
    currency: 'USD ($)',
    darkMode: true,
    autoPrint: false,
    customerDisplay: true
  },
  loading: true,

  fetchSettings: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/settings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        set({ settings: data, loading: false });
        
        // Apply dark mode theme if set
        if (data.darkMode) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      set({ loading: false });
    }
  },

  updateSettings: (newSettings) => {
    set((state) => ({ 
      settings: { ...state.settings, ...newSettings } 
    }));
    
    // Immediate UI feedback for some settings
    if (newSettings.darkMode !== undefined) {
      document.documentElement.setAttribute('data-theme', newSettings.darkMode ? 'dark' : 'light');
    }
  },

  getCurrencySymbol: () => {
    const { currency } = get().settings;
    if (currency.includes('($)')) return '$';
    if (currency.includes('(€)')) return '€';
    if (currency.includes('(£)')) return '£';
    return '$';
  }
}));

export default useSettings;
