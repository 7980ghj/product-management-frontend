import { FaSearch, FaTimes } from 'react-icons/fa'

const ProductFilters = ({ filters, setFilters, categories }) => {

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value, page: 1 })
  }

  const handleSearchChange = (e) => {
    setFilters({ ...filters, search: e.target.value, page: 1 })
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      sortBy: '',
      sortOrder: 'asc',
      page: 1,
      limit: 5,
    })
  }

  const hasActiveFilters = filters.search || filters.category || filters.status || filters.sortBy

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

        {/* Search */}
        <div className="lg:col-span-2">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search idols by name..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-sm transition-all"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-sm appearance-none cursor-pointer transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-sm appearance-none cursor-pointer transition-all"
          >
            <option value="">All Status</option>
            <option value="Active">🟢 Active</option>
            <option value="Inactive">🔴 Inactive</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 text-sm appearance-none cursor-pointer transition-all"
          >
            <option value="">Sort By</option>
            <option value="price">Price: Low → High</option>
            <option value="-price">Price: High → Low</option>
            <option value="productName">Name: A → Z</option>
            <option value="-productName">Name: Z → A</option>
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-orange-100">
                🔍 "{filters.search}"
              </span>
            )}
            {filters.category && (
              <span className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-100">
                📂 {filters.category}
              </span>
            )}
            {filters.status && (
              <span className="flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-green-100">
                {filters.status === 'Active' ? '🟢' : '🔴'} {filters.status}
              </span>
            )}
            {filters.sortBy && (
              <span className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg text-xs font-medium border border-purple-100">
                ↕️ Sorted
              </span>
            )}
          </div>
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors"
          >
            <FaTimes className="text-xs" /> Clear All
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductFilters