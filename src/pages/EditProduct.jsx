import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById, updateProduct } from '../services/api'
import toast from 'react-hot-toast'
import { FaSave, FaTimes, FaUpload, FaRupeeSign } from 'react-icons/fa'
import Loader from '../components/Loader'
import { BACKEND_URL } from '../services/config'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    brand: 'Eshvar Murti Kala Kendra',
    price: '',
    discountPercentage: '',
    stockQuantity: '',
    description: '',
    status: 'Active',
    productImage: null,
  })
  const [errors, setErrors] = useState({})

  const categories = [
    'Ganesh Murti',
    'Lakshmi Murti',
    'Shiv Murti',
    'Krishna Murti',
    'Ram Darbar',
    'Durga Murti',
    'Saraswati Murti',
    'Hanuman Murti',
    'Buddha Murti',
    'Sai Baba Murti',
    'Radha Krishna',
    'Vishnu Murti',
    'Other',
  ]

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id)
      if (data.success) {
        const product = data.data
        setFormData({
          productName: product.productName,
          category: product.category,
          brand: product.brand || 'Eshvar Murti Kala Kendra',
          price: product.price,
          discountPercentage: product.discountPercentage || '',
          stockQuantity: product.stockQuantity,
          description: product.description || '',
          status: product.status,
          productImage: null,
        })
        setImagePreview(`http://127.0.0.1:5000${product.productImage}`)
      }
    } catch (error) {
      toast.error('Failed to fetch product')
      navigate('/products')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        toast.error('Only image files are allowed')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB')
        return
      }
      setFormData({ ...formData, productImage: file })
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.productName.trim()) newErrors.productName = 'Product name is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Price must be greater than 0'
    if (formData.stockQuantity === '' || Number(formData.stockQuantity) < 0) newErrors.stockQuantity = 'Stock cannot be negative'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }

    setSaving(true)
    try {
      const data = new FormData()
      data.append('productName', formData.productName)
      data.append('category', formData.category)
      data.append('brand', formData.brand)
      data.append('price', formData.price)
      data.append('discountPercentage', formData.discountPercentage || 0)
      data.append('stockQuantity', formData.stockQuantity)
      data.append('description', formData.description)
      data.append('status', formData.status)
      if (formData.productImage) {
        data.append('productImage', formData.productImage)
      }

      const response = await updateProduct(id, data)
      if (response.data.success) {
        toast.success('🪔 Product updated successfully!')
        navigate('/products')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">✏️ Edit Product</h1>
          <p className="text-sm text-purple-600/70 mt-1">Update idol details</p>
        </div>
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-white/30 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-white/70 transition-all"
        >
          <FaTimes /> Cancel
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Product Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name <span className="text-pink-500">*</span>
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all ${
                errors.productName ? 'border-pink-500' : 'border-purple-200/50'
              }`}
            />
            {errors.productName && <p className="text-pink-500 text-xs mt-1.5 font-medium">{errors.productName}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-pink-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all ${
                errors.category ? 'border-pink-500' : 'border-purple-200/50'
              }`}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-pink-500 text-xs mt-1.5 font-medium">{errors.category}</p>}
          </div>

          {/* Brand */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/60 border border-purple-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price (₹) <span className="text-pink-500">*</span>
            </label>
            <div className="relative">
              <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                className={`w-full pl-10 pr-4 py-3 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all ${
                  errors.price ? 'border-pink-500' : 'border-purple-200/50'
                }`}
              />
            </div>
            {errors.price && <p className="text-pink-500 text-xs mt-1.5 font-medium">{errors.price}</p>}
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Discount (%)</label>
            <input
              type="number"
              name="discountPercentage"
              value={formData.discountPercentage}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-4 py-3 bg-white/60 border border-purple-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stock Quantity <span className="text-pink-500">*</span>
            </label>
            <input
              type="number"
              name="stockQuantity"
              value={formData.stockQuantity}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-3 bg-white/60 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all ${
                errors.stockQuantity ? 'border-pink-500' : 'border-purple-200/50'
              }`}
            />
            {errors.stockQuantity && <p className="text-pink-500 text-xs mt-1.5 font-medium">{errors.stockQuantity}</p>}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/60 border border-purple-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all"
            >
              <option value="Active">🟢 Active</option>
              <option value="Inactive">🔴 Inactive</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 bg-white/60 border border-purple-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-400 transition-all resize-none"
            />
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Image</label>
            <div className="border-2 border-dashed border-purple-200/50 rounded-2xl p-8 text-center bg-white/30 hover:border-purple-400/50 transition-all">
              {imagePreview ? (
                <div className="flex flex-col items-center gap-4">
                  <img src={`${BACKEND_URL}${product.productImage}`} alt="Preview" className="w-44 h-44 object-cover rounded-2xl shadow-lg shadow-purple-500/10 border-2 border-white/50" />
                  <p className="text-sm text-purple-500">Select a new image to replace</p>
                </div>
              ) : (
                <div>
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FaUpload className="text-2xl text-purple-400" />
                  </div>
                  <p className="text-gray-600 font-medium">Upload new image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
              />
            </div>
          </div>
        </div>

        {/* Final Price */}
        {formData.price && (
          <div className="mt-6 p-5 bg-gradient-to-r from-purple-50/80 to-pink-50/80 rounded-xl border border-purple-200/30">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 font-medium">Final Price:</p>
              <div className="text-right">
                <span className="text-2xl font-bold text-purple-700">
                  ₹{(formData.price - (formData.price * (formData.discountPercentage || 0)) / 100).toFixed(2)}
                </span>
                {formData.discountPercentage > 0 && (
                  <span className="text-sm text-gray-400 line-through ml-2">₹{formData.price}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-7 py-3.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSave /> {saving ? 'Updating...' : 'Update Product'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 bg-white/50 border border-purple-200/50 text-gray-700 px-7 py-3.5 rounded-xl hover:bg-white/70 transition-all font-medium"
          >
            <FaTimes /> Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProduct