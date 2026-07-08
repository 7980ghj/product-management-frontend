import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, deleteProduct } from '../services/api'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash, FaArrowLeft, FaTag, FaBoxOpen, FaCalendar, FaRupeeSign } from 'react-icons/fa'
import Loader from '../components/Loader'
import { BACKEND_URL } from '../services/config'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const { data } = await getProductById(id)
      if (data.success) {
        setProduct(data.data)
      }
    } catch (error) {
      toast.error('Failed to fetch product details')
      navigate('/products')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${product.productName}"?`)) {
      try {
        const { data } = await deleteProduct(id)
        if (data.success) {
          toast.success('Product deleted successfully')
          navigate('/products')
        }
      } catch (error) {
        toast.error('Failed to delete product')
      }
    }
  }

  if (loading) return <Loader />
  if (!product) return null

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-white/30 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-white/70 transition-all"
        >
          <FaArrowLeft /> Back to Products
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/products/edit/${id}`)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all font-medium"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500 text-white px-5 py-2.5 rounded-xl hover:bg-red-600 hover:shadow-lg transition-all font-medium"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      {/* Product Card */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* Image */}
          <div className="bg-gradient-to-br from-purple-100/50 to-pink-100/50 p-8 flex items-center justify-center min-h-[400px]">
            <img src={product.image && product.image.startsWith('http') ? product.image : `${BACKEND_URL}${product.image}`} alt={product.name} />
              alt={product.productName}
              className="max-w-full max-h-96 object-contain rounded-2xl shadow-xl shadow-purple-500/10"
          
          </div>

          {/* Details */}
          <div className="p-8">
            {/* Status */}
            <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold mb-4 ${
              product.status === 'Active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {product.status === 'Active' ? '🟢' : '🔴'} {product.status}
            </span>

            {/* Name */}
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.productName}</h1>
            <p className="text-purple-600 text-lg mb-5">{product.brand}</p>

            {/* Price Card */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 mb-6 border border-purple-100">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-purple-700">₹{product.finalPrice}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-xl text-gray-400 line-through">₹{product.price}</span>
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <p className="text-sm text-green-600 mt-2 font-medium">
                  ✨ You save ₹{(product.price - product.finalPrice).toFixed(2)}!
                </p>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/60 rounded-xl p-4 border border-purple-100/50">
                <div className="flex items-center gap-2 text-purple-400 text-sm mb-1.5">
                  <FaTag /> Category
                </div>
                <p className="font-bold text-gray-800">{product.category}</p>
              </div>

              <div className="bg-white/60 rounded-xl p-4 border border-purple-100/50">
                <div className="flex items-center gap-2 text-purple-400 text-sm mb-1.5">
                  <FaBoxOpen /> Stock
                </div>
                <p className={`font-bold ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stockQuantity > 0 ? `${product.stockQuantity} units` : 'Out of Stock'}
                </p>
              </div>

              <div className="bg-white/60 rounded-xl p-4 border border-purple-100/50">
                <div className="flex items-center gap-2 text-purple-400 text-sm mb-1.5">
                  <FaRupeeSign /> MRP
                </div>
                <p className="font-bold text-gray-800">₹{product.price}</p>
              </div>

              <div className="bg-white/60 rounded-xl p-4 border border-purple-100/50">
                <div className="flex items-center gap-2 text-purple-400 text-sm mb-1.5">
                  <FaCalendar /> Added On
                </div>
                <p className="font-bold text-gray-800">
                  {new Date(product.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-bold text-gray-800 mb-2">📝 Description</h3>
                <p className="text-gray-600 leading-relaxed bg-white/50 p-4 rounded-xl border border-purple-100/30">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-purple-400/60 mt-4">
        Last updated: {new Date(product.updatedAt).toLocaleString('en-IN')}
      </p>
    </div>
  )
}

export default ProductDetails