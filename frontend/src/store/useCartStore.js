import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  taxRate: 0.10, // 10%
  discount: 0,
  paymentStep: 'idle',
  paymentMethod: 'card',
  
  addToCart: (product, options = {}) => set((state) => {
    const existingIndex = state.cart.findIndex(item => 
      item.id === product.id && JSON.stringify(item.options) === JSON.stringify(options)
    );
    
    if (existingIndex >= 0) {
      const newCart = [...state.cart];
      newCart[existingIndex].qty += 1;
      return { cart: newCart };
    }
    
    return { cart: [...state.cart, { ...product, qty: 1, options, cartId: Date.now().toString() }] };
  }),

  updateQty: (cartId, qty) => set((state) => ({
    cart: state.cart.map(item => item.cartId === cartId ? { ...item, qty: Math.max(1, qty) } : item)
  })),

  removeFromCart: (cartId) => set((state) => ({
    cart: state.cart.filter(item => item.cartId !== cartId)
  })),

  updateNotes: (cartId, notes) => set((state) => ({
    cart: state.cart.map(item => item.cartId === cartId ? { ...item, options: { ...item.options, notes } } : item)
  })),

  clearCart: () => set({ cart: [], paymentStep: 'idle' }),
  
  setDiscount: (amount) => set({ discount: amount }),
  setPaymentStep: (step) => set({ paymentStep: step }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
}));

// Setup Cross-tab Synchronization for the Customer Facing Display!
const channel = new BroadcastChannel('pos_sync');
let isSyncing = false;

useCartStore.subscribe((state) => {
  if (!isSyncing) {
    const payload = {
      cart: state.cart,
      taxRate: state.taxRate,
      discount: state.discount,
      paymentStep: state.paymentStep,
      paymentMethod: state.paymentMethod,
    };
    channel.postMessage({ type: 'STATE_UPDATE', state: payload });
  }
});

channel.onmessage = (event) => {
  if (event.data.type === 'STATE_UPDATE') {
    isSyncing = true;
    useCartStore.setState(event.data.state);
    isSyncing = false;
  }
  if (event.data.type === 'REQUEST_STATE') {
    const state = useCartStore.getState();
    const payload = {
      cart: state.cart,
      taxRate: state.taxRate,
      discount: state.discount,
      paymentStep: state.paymentStep,
      paymentMethod: state.paymentMethod,
    };
    channel.postMessage({ type: 'STATE_UPDATE', state: payload });
  }
};

channel.postMessage({ type: 'REQUEST_STATE' });

export default useCartStore;
