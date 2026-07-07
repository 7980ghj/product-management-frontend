import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://product-management-backend-3.onrender.com/api',
});

// Products API
export const getAllProducts = (params) => api.get('/products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getDashboardStats = () => api.get('/products/stats/dashboard');
export const getProductsByCategory = (category) => api.get(`/products?category=${category}`);

export default api;