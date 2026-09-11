import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
//import storage from 'redux-persist/lib/storage'; // используем localStorage
import cartReducer from './slices/cartSlice';
import categoriesReducer from './slices/categoriesSlice';
import itemsReducer from './slices/itemsSlice';
import topSalesReducer from './slices/topSalesSlice';
import orderReducer from './slices/orderSlice';

//Ручная обёртка над localStorage (импорт не работает)
const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

// 1. Конфигурация persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['cart'], // Сохраняем только корзину
};

// 2. Объединяем редьюсеры
const rootReducer = combineReducers({
  cart: cartReducer,
  categories: categoriesReducer,
  items: itemsReducer,
  topSales: topSalesReducer,
  order: orderReducer,
});

// 3. Оборачиваем корневой редьюсер
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Создаем store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем действия redux-persist в проверке на сериализуемость
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 5. Создаем persistor
export const persistor = persistStore(store);