import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaUserPlus, FaCheck, FaTimes } from 'react-icons/fa'
import { registerUser } from '../services/api'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  // Password strength indicators
  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    number: /[0-9]/.test(formData.password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password),
  }

  // Username strength indicators
  const usernameChecks = {
    uppercase: /[A-Z]/.test(formData.username),
    number: /[0-9]/.test(formData.username),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.username),
    length: formData.username.length >= 4,
  }

  const validateForm = () => {
    const newErrors = {}

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters'
    } else if (!/[A-Z]/.test(formData.username)) {
      newErrors.username = 'Must contain at least 1 uppercase letter'
    } else if (!/[0-9]/.test(formData.username)) {
      newErrors.username = 'Must contain at least 1 number'
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.username)) {
      newErrors.username = 'Must contain at least 1 special character'
    }

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

    // Confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
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

    try {
      await registerUser({
        username: formData.username,
        email: formData.email,
        password=[REDACTED_PASSWORD]
      })

      toast.success('🎉 Registration successful! Please login.')
      navigate('/login')
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }
  const CheckItem = ({ passed, text }) => (
    <div className={`flex items-center gap-2 text-xs ${passed ? 'text-green-600' : 'text-gray-400'}`}>
      {passed ? <FaCheck className="text-green-500" /> : <FaTimes className="text-gray-300" />}
      {text}
    </div>
  )

  return (
    <div className="min-h-screen main-bg flex items-center justify-center p-4 relative">
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-6">
         <img src="/logo.png" alt="Eshvar Arts" className="w-28 h-28 object-contain mx-auto mb-4 drop-shadow-xl" />
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-purple-600/70 mt-1">Register as Admin</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 shadow-xl">
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g. Admin@1"
                className={`w-full pl-11 pr-4 py-3.5 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all ${
                  errors.username ? 'border-pink-500' : 'border-purple-200/50'
                }`}
              />
            </div>
            {errors.username && <p className="text-pink-500 text-xs mt-1.5 font-medium">{errors.username}</p>}
            {/* Username strength */}
            {formData.username && (
              <div className="mt-2 p-2.5 bg-purple-50/50 rounded-lg grid grid-cols-2 gap-1">
                <CheckItem passed={usernameChecks.length} text="Min 4 characters" />
                <CheckItem passed={usernameChecks.uppercase} text="1 uppercase" />
                <CheckItem passed={usernameChecks.number} text="1 number" />
                <CheckItem passed={usernameChecks.special} text="1 special char" />
              </div>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
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
          <div className="mb-4">
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
                placeholder="Create strong password"
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
            {/* Password strength */}
            {formData.password && (
              <div className="mt-2 p-2.5 bg-purple-50/50 rounded-lg grid grid-cols-2 gap-1">
                <CheckItem passed={passwordChecks.length} text="Min 8 characters" />
                <CheckItem passed={passwordChecks.uppercase} text="1 uppercase" />
                <CheckItem passed={passwordChecks.number} text="1 number" />
                <CheckItem passed={passwordChecks.special} text="1 special char" />
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={`w-full pl-11 pr-12 py-3.5 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all ${
                  errors.confirmPassword ? 'border-pink-500' : 'border-purple-200/50'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-pink-500 text-xs mt-1.5 font-medium">{errors.confirmPassword}</p>}
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="text-green-500 text-xs mt-1.5 font-medium flex items-center gap-1">
                <FaCheck /> Passwords match
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaUserPlus /> {loading ? 'Creating Account...' : 'Register'}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 font-semibold hover:text-pink-500 transition-colors">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register