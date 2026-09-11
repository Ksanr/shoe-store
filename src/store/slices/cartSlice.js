import { createSlice } from '@reduxjs/toolkit';

const initialState = []; // Начальное состояние — пустой массив

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, size, price, title, image, count = 1 } = action.payload;
      const existing = state.find((item) => item.id === id && item.size === size);
      if (existing) {
        existing.count += count;
      } else {
        state.push({ id, size, price, title, image, count });
      }
    },
    removeFromCart(state, action) {
      const { id, size } = action.payload;
      const index = state.findIndex((item) => item.id === id && item.size === size);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    clearCart(state) {
      state.length = 0;
    },
    incrementItem(state, action) {
      const { id, size } = action.payload;
      const item = state.find((item) => item.id === id && item.size === size);
      if (item) item.count += 1;
    },
    decrementItem(state, action) {
      const { id, size } = action.payload;
      const item = state.find((item) => item.id === id && item.size === size);
      if (item && item.count > 1) {
        item.count -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, incrementItem, decrementItem } = cartSlice.actions;
export default cartSlice.reducer;