import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  try {
    const serialized = localStorage.getItem('cart');
    if (serialized === null) return [];
    return JSON.parse(serialized);
  } catch (e) {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCart(),
  reducers: {
    addToCart(state, action) {
      const { id, size, price, title, image, count = 1 } = action.payload;
      const existing = state.find(item => item.id === id && item.size === size);
      if (existing) {
        existing.count += count;
      } else {
        state.push({ id, size, price, title, image, count });
      }
      saveCart(state);
    },
    removeFromCart(state, action) {
      const { id, size } = action.payload;
      const index = state.findIndex(item => item.id === id && item.size === size);
      if (index !== -1) {
        state.splice(index, 1);
        saveCart(state);
      }
    },
    clearCart(state) {
      state.length = 0;
      saveCart(state);
    },
    incrementItem(state, action) {
      const { id, size } = action.payload;
      const item = state.find(item => item.id === id && item.size === size);
      if (item) item.count += 1;
      saveCart(state);
    },
    decrementItem(state, action) {
      const { id, size } = action.payload;
      const item = state.find(item => item.id === id && item.size === size);
      if (item && item.count > 1) {
        item.count -= 1;
        saveCart(state);
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, incrementItem, decrementItem } = cartSlice.actions;
export default cartSlice.reducer;