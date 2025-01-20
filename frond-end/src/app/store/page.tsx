// store.js
import {create} from 'zustand';
import { GET_CART } from '../Api/api_list';

const useStore = create((set:any) => ({
  cart: null, // Initial state for cart data
  isLoading: false,
  error: null,
  
  // Action to fetch cart data by cartid
  fetchCart: async (cartid:any) => {
    set({ isLoading: true, error: null }); // Set loading state
    try {
      const response = await fetch(`${GET_CART}/${cartid}`);
      const data = await response.json();
      set({ cart: data, isLoading: false }); // Set cart data and stop loading
    } catch (err) {
      set({ error: err, isLoading: false }); // Handle error
    }
  },
}));

export default useStore;
