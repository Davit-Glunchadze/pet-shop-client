import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WishlistItem {
  id: string;
}

interface WishlistState {
  items: WishlistItem[];
}

const loadFromLocalStorage = (): WishlistItem[] => {
  try {
    const serializedState = localStorage.getItem('wishlist');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Failed to load wishlist from localStorage', e);
    return [];
  }
};

const saveToLocalStorage = (items: WishlistItem[]) => {
  try {
    const serializedState = JSON.stringify(items);
    localStorage.setItem('wishlist', serializedState);
  } catch (e) {
    console.warn('Failed to save wishlist to localStorage', e);
  }
};

const initialState: WishlistState = {
  items: loadFromLocalStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.items.find(item => item.id === action.payload)) {
        state.items.push({ id: action.payload });
        saveToLocalStorage(state.items);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveToLocalStorage(state.items);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
