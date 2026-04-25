import { create } from 'zustand';

const PERMISSIONS = {
  Admin: ['create_order', 'process_payment', 'view_orders', 'update_order_status', 'manage_menu', 'view_reports', 'manage_users'],
  Cashier: ['create_order', 'process_payment', 'view_orders'],
  Barista: ['view_orders', 'update_order_status'],
  InventoryManager: ['add_stock', 'view_stock_reports']
};

const useAuthStore = create((set, get) => ({
  user: null,
  
  setUser: (user) => set({ user }),
  
  can: (permission) => {
    const role = get().user?.role;
    if (!role) return false;
    return PERMISSIONS[role]?.includes(permission);
  }
}));

export default useAuthStore;
