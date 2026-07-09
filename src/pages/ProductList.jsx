import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa'
import { getAllProducts, deleteProduct, getDashboardStats } from '../services/api'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'
import { BACKEND_URL } from '../services/config'
import ProductFilters from '../components/ProductFilters'

const ProductList = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({})
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    sortBy: '',
    sortOrder: 'asc',
    page: 1,
    limit: 5,
  })

  useEffect(() => {
    fetchProducts()
  }, [filters])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data } = await getDashboardStats()
      if (data.success) {
        setCategories(data.data.categories || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = {
        page: filters.page,
        limit: filters.limit,
      }

      if (filters.search) params.search = filters.search
      if (filters.category) params.category = filters.category
      if (filters.status) params.status = filters.status

      if (filters.sortBy) {
        if (filters.sortBy.startsWith('-')) {
          params.sortBy = filters.sortBy.slice(1)
          params.sortOrder = 'desc'
        } else {
          params.sortBy = filters.sortBy
          params.sortOrder = 'asc'
        }
      }

      const { data } = await getAllProducts(params)
      if (data.success) {
        setProducts(data.data)
        setPagination(data.pagination)
      }
    } catch (error) {
      toast.error('Failed to fetch products')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        const { data } = await deleteProduct(id)
        if (data.success) {
          toast.success('🗑️ Product deleted successfully')
          fetchProducts()
        }
      } catch (error) {
        toast.error('Failed to delete product')
      }
    }
  }

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage })
  }

      console.log(products);

  return (

    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🪔 All Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your divine idol collection</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-orange-50 border border-orange-200 px-4 py-2 rounded-xl">
            <span className="text-orange-700 font-bold text-lg">{pagination.totalProducts || 0}</span>
            <span className="text-orange-600/70 text-xs ml-1.5">products</span>
          </div>
          <button
            onClick={() => navigate('/products/add')}
            className="flex items-center gap-2 gradient-orange text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 font-medium text-sm"
          >
            <FaPlus /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <ProductFilters filters={filters} setFilters={setFilters} categories={categories} />

      {/* Content */}
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            🪔
          </div>
          <p className="text-gray-600 text-lg font-medium">No products found</p>
          <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">
            {filters.search || filters.category || filters.status
              ? 'Try adjusting your search or filter criteria'
              : 'Start building your divine collection by adding your first idol'}
          </p>
          {!filters.search && !filters.category && !filters.status && (
            <button
              onClick={() => navigate('/products/add')}
              className="mt-6 gradient-orange text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all font-medium"
            >
              + Add First Product
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden card-hover group">
                {/* Image */}
                <div className="h-52 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
                 <img 
  src={product.productImage && product.productImage.startsWith('data:') ? product.productImage : product.productImage ? `${BACKEND_URL}${product.productImage}` : '/placeholder.png'}
  alt={product.productName}
  className="w-full h-full object-cover"
/>
            
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold shadow-sm ${
                      product.status === 'Active'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-orange-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm">
                        {product.discountPercentage}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="font-bold text-gray-800 truncate text-sm">{product.productName}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{product.category}</span>
                      <span className="text-xs text-gray-400">• {product.brand}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold text-gray-800">₹{product.finalPrice}</span>
                    {product.discountPercentage > 0 && (
                      <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                    )}
                  </div>

                  {/* Stock */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${product.stockQuantity > 10 ? 'bg-green-500' : product.stockQuantity > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                      <span className="text-xs text-gray-500">
                        {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Out of stock'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => navigate(`/products/${product._id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 text-blue-600 py-2 rounded-xl text-xs font-medium hover:bg-blue-100 transition-colors"
                    >
                      <FaEye /> View
                    </button>
                    <button
                      onClick={() => navigate(`/products/edit/${product._id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-orange-50 text-orange-600 py-2 rounded-xl text-xs font-medium hover:bg-orange-100 transition-colors"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id, product.productName)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 text-red-600 py-2 rounded-xl text-xs font-medium hover:bg-red-100 transition-colors"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(filters.page - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-orange-300 transition-all"
              >
                ← Prev
              </button>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                    pageNum === pagination.currentPage
                      ? 'gradient-orange text-white shadow-lg shadow-orange-500/25'
                      : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-300 hover:text-orange-600'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(filters.page + 1)}
                disabled={!pagination.hasNextPage}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-orange-300 transition-all"
              >
                Next →
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Showing {products.length} of {pagination.totalProducts} products • Page {pagination.currentPage} of {pagination.totalPages}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductList