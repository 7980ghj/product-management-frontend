import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Dashboard'
import ProductList from './pages/ProductList'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import ProductDetails from './pages/ProductDetails'
import AboutUs from './pages/AboutUs'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  )

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true')
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('adminUser')
    setIsLoggedIn(false)
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={
        isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
      } />
      <Route path="/register" element={
        isLoggedIn ? <Navigate to="/" /> : <Register />
      } />

      {/* Protected Admin Routes */}
      <Route path="/" element={
        isLoggedIn ? <AdminLayout onLogout={handleLogout} /> : <Navigate to="/login" />
      }>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="about" element={<AboutUs />} />
      </Route>
    </Routes>
  )
}

export default App