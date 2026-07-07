import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa'

const Login = ({ onLogin }) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation - must be @gmail.com
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!formData.email.endsWith('@gmail.com')) {
      newErrors.email = 'Only @gmail.com emails are allowed'
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = 'Enter a valid Gmail address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = 'Must contain at least 1 uppercase letter'
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = 'Must contain at least 1 number'
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password)) {
      newErrors.password = 'Must contain at least 1 special character'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error('Please fix the errors')
      return
    }

    setLoading(true)

    // Simulate login (check against registered user in localStorage)
    setTimeout(() => {
      const registeredUser = JSON.parse(localStorage.getItem('adminUser'))

      if (registeredUser && registeredUser.email === formData.email && registeredUser.password === formData.password) {
        toast.success('🪔 Welcome back, Admin!')
        onLogin()
        navigate('/')
      } else if (!registeredUser) {
        toast.error('No account found. Please register first.')
      } else {
        toast.error('Invalid email or password')
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen main-bg flex items-center justify-center p-4 relative">
      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
       <img src="/logo.png" alt="Eshvar Arts" className="w-28 h-28 object-contain mx-auto mb-4 drop-shadow-xl" />
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-purple-600/70 mt-1">Login to Eshvar Murti Kala Kendra</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 shadow-xl">
          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@gmail.com"
                className={`w-full pl-11 pr-4 py-3.5 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all ${
                  errors.email ? 'border-pink-500' : 'border-purple-200/50'
                }`}
              />
            </div>
            {errors.email && <p className="text-pink-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
            <p className="text-[10px] text-purple-400 mt-1">Only @gmail.com accepted</p>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full pl-11 pr-12 py-3.5 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all ${
                  errors.password ? 'border-pink-500' : 'border-purple-200/50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-pink-500 text-xs mt-1.5 font-medium">{errors.password}</p>}
            <p className="text-[10px] text-purple-400 mt-1">Min 8 chars, 1 uppercase, 1 number, 1 special char</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSignInAlt /> {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-600 font-semibold hover:text-pink-500 transition-colors">
              Register here
            </Link>
          </p>
        </form>

        {/* Demo Credentials Note */}
        <div className="mt-4 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-purple-200/30 text-center">
          <p className="text-xs text-gray-500">Register first to create your admin account</p>
        </div>
      </div>
    </div>
  )
}

export default Login