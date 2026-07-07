import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api',
})

export const getAllProducts = (params) => API.get('/products', { params })
export const getProductById = (id) => API.get(`/products/${id}`)
export const createProduct = (formData) => API.post('/products', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
})
export const updateProduct = (id, formData) => API.put(`/products/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
})
export const deleteProduct = (id) => API.delete(`/products/${id}`)
export const getDashboardStats = () => API.get('/products/stats/dashboard')

export default API