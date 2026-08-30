import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import itemsReducer from './slices/itemsSlice';
import topSalesReducer from './slices/topSalesSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    items: itemsReducer,
    topSales: topSalesReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});