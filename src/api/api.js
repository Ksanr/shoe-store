import axios from 'axios';

const BASE_URL = 'https://ra16-diploma-1.onrender.com/api';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Функции для запросов
export const getTopSales = () => api.get('/top-sales');
export const getCategories = () => api.get('/categories');
export const getItems = (params) => api.get('/items', { params });
export const getItemById = (id) => api.get(`/items/${id}`);
export const postOrder = (orderData) => api.post('/order', orderData);