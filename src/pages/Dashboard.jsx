import DashboardCharts from '../components/DashboardCharts'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBoxOpen, FaCheckCircle, FaTimesCircle, FaTags, FaWarehouse, FaArrowRight, FaArrowUp } from 'react-icons/fa'
import { getDashboardStats } from '../services/api'
import Loader from '../components/Loader'

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { data } = await getDashboardStats()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  const cards = [
    {
      title: 'Total Products',
      value: stats?.totalProducts || 0,
      icon: <FaBoxOpen />,
      gradient: 'from-blue-600 via-blue-500 to-indigo-500',
      shadow: 'shadow-blue-500/30',
      lightBg: 'bg-blue-400/20',
      description: 'All idol products',
      trend: '+12%',
    },
    {
      title: 'Active Products',
      value: stats?.activeProducts || 0,
      icon: <FaCheckCircle />,
      gradient: 'from-emerald-600 via-green-500 to-teal-500',
      shadow: 'shadow-green-500/30',
      lightBg: 'bg-green-400/20',
      description: 'Currently selling',
      trend: '+8%',
    },
    {
      title: 'Inactive Products',
      value: stats?.inactiveProducts || 0,
      icon: <FaTimesCircle />,
      gradient: 'from-rose-600 via-red-500 to-pink-500',
      shadow: 'shadow-red-500/30',
      lightBg: 'bg-red-400/20',
      description: 'Not available',
      trend: '-3%',
    },
    {
      title: 'Categories',
      value: stats?.totalCategories || 0,
      icon: <FaTags />,
      gradient: 'from-violet-600 via-purple-500 to-fuchsia-500',
      shadow: 'shadow-purple-500/30',
      lightBg: 'bg-purple-400/20',
      description: 'Idol categories',
      trend: '+2',
    },
    {
      title: 'Total Stock',
      value: stats?.totalStock || 0,
      icon: <FaWarehouse />,
      gradient: 'from-amber-600 via-orange-500 to-yellow-500',
      shadow: 'shadow-orange-500/30',
      lightBg: 'bg-orange-400/20',
      description: 'Units in inventory',
      trend: '+120',
    },
  ]

  return (
    <div>
      {/* Welcome Banner with Logo & Animated Idols */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 p-6 lg:p-8 mb-8 shadow-xl shadow-purple-500/20">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-white/30 rounded-full animate-twinkle"></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-white/20 rounded-full animate-twinkle" style={{animationDelay: '1.5s'}}></div>

        <div className="relative z-10 flex items-center justify-between">
          {/* Left - Logo & Text */}
          <div className="flex items-center gap-5">
            <img src="/main-logo.png" alt="Eshvar Arts" className="w-60 h-60 lg:w-24 lg:h-24 object-contain drop-shadow-2xl animate-float" />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">Eshvar Arts</h1>
              <p className="text-purple-100/80 text-sm mt-1">Admin Panel - Manage your divine collection</p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">🪔 Murti Kala Kendra</span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">✨ Since 1972</span>
              </div>
            </div>
          </div>

          {/* Right - Animated Idol Characters */}
          <div className="hidden md:flex items-end gap-2">
            <img
              src="/e-commerce-ganpati.png"
              alt="Ganpati"
              className="w-24 lg:w-32 h-24 lg:h-32 object-contain drop-shadow-xl animate-float"
              style={{ animationDelay: '0.5s' }}
            />

            <img
              src="/cute-ganesha.png"
              alt="Ganpati"
              className="w-24 lg:w-32 h-24 lg:h-32 object-contain drop-shadow-xl animate-float"
              style={{ animationDelay: '0.5s' }}
            />
            <img
              src="/shiv-parwati.png"
              alt="Ganpati"
              className="w-24 lg:w-32 h-24 lg:h-32 object-contain drop-shadow-xl animate-float"
              style={{ animationDelay: '0.5s' }}
            />

            <img
              src="/e-commerce-durga.png"
              alt="Durga Mata"
              className="w-20 lg:w-28 h-20 lg:h-28 object-contain drop-shadow-xl animate-float"
              style={{ animationDelay: '1s' }}
            />
          </div>
        </div>
      </div>

      {/* Leaf-Shaped Stats Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
  {cards.map((card, index) => (
    <div key={index} className="flex flex-col items-center group cursor-pointer">
      {/* Leaf Shape */}
      <div
        className={`relative w-44 h-52 bg-gradient-to-br ${card.gradient} shadow-xl ${card.shadow} transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden`}
        style={{
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          clipPath: 'ellipse(50% 50% at 50% 50%)',
          borderTopLeftRadius: '80%',
          borderTopRightRadius: '80%',
          borderBottomLeftRadius: '20%',
          borderBottomRightRadius: '80%',
          borderRadius: '70% 30% 70% 30% / 60% 60% 40% 40%',
        }}
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-8 -mt-8"></div>
        <div className="absolute bottom-4 left-2 w-14 h-14 bg-white/5 rounded-full"></div>
        <div className="absolute top-4 right-6 w-1.5 h-1.5 bg-white/40 rounded-full animate-twinkle"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-5 text-center">
          {/* Icon */}
          <div className={`w-11 h-11 ${card.lightBg} rounded-xl flex items-center justify-center text-white text-lg mb-3 backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300`}>
            {card.icon}
          </div>

          {/* Value */}
          <p className="text-3xl font-extrabold text-white tracking-tight">
            {card.value}
          </p>

          {/* Title */}
          <p className="text-xs text-white/80 font-medium mt-1">{card.title}</p>

          {/* Trend */}
          <div className="flex items-center gap-1 bg-white/15 px-2 py-0.5 rounded-full mt-2">
            <FaArrowUp className="text-[8px] text-white/80" />
            <span className="text-[9px] text-white/80 font-bold">{card.trend}</span>
          </div>
        </div>
      </div>

      {/* Leaf stem line */}
      <div className="w-0.5 h-4 bg-gradient-to-b from-gray-400 to-transparent mt-1"></div>

      {/* Description below leaf */}
      <p className="text-[10px] text-gray-500 font-medium mt-1">{card.description}</p>
    </div>
  ))}
</div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Categories */}
        {stats?.categories && stats.categories.length > 0 && (
          <div className="glass-card rounded-2xl p-6 card-hover">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-800">🏷️ Idol Categories</h2>
              <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1.5 rounded-full font-semibold">
                {stats.categories.length} types
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {stats.categories.map((cat, index) => (
                <span key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-4 py-2 rounded-xl text-sm font-medium border border-purple-200/50 hover:shadow-md hover:border-purple-300 transition-all cursor-pointer">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="glass-card rounded-2xl p-6 card-hover">
          <h2 className="text-lg font-bold text-gray-800 mb-5">⚡ Quick Actions</h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/products/add')}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 hover:shadow-lg hover:border-purple-300 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-purple-500/20">
                  <FaBoxOpen />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Add New Idol</p>
                  <p className="text-xs text-gray-500">Add a new murti to collection</p>
                </div>
              </div>
              <FaArrowRight className="text-purple-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate('/products')}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50 hover:shadow-lg hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <FaTags />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">View All Products</p>
                  <p className="text-xs text-gray-500">Browse your idol inventory</p>
                </div>
              </div>
              <FaArrowRight className="text-blue-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <DashboardCharts stats={stats} />
    </div>
  )
}

export default Dashboard