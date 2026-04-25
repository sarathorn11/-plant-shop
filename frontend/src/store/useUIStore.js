import { create } from 'zustand';

const useUIStore = create((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query })
}));

export default useUIStore;
