import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Pie, Bar } from 'react-chartjs-2'
import { getAllProducts } from '../services/api'

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

const DashboardCharts = ({ stats }) => {
  const [categoryData, setCategoryData] = useState(null)
  const [stockData, setStockData] = useState(null)

  useEffect(() => {
    fetchChartData()
  }, [])

  const fetchChartData = async () => {
    try {
      const { data } = await getAllProducts({ limit: 100 })
      if (data.success) {
        const products = data.data

        // Category-wise product count
        const categoryCount = {}
        const categoryStock = {}
        products.forEach((p) => {
          categoryCount[p.category] = (categoryCount[p.category] || 0) + 1
          categoryStock[p.category] = (categoryStock[p.category] || 0) + p.stockQuantity
        })

        // Colors for charts
        const colors = [
          '#8b5cf6', '#ec4899', '#6366f1', '#14b8a6',
          '#f59e0b', '#ef4444', '#3b82f6', '#10b981',
          '#f97316', '#a855f7', '#06b6d4', '#84cc16',
        ]

        // Pie Chart Data
        setCategoryData({
          labels: Object.keys(categoryCount),
          datasets: [{
            data: Object.values(categoryCount),
            backgroundColor: colors.slice(0, Object.keys(categoryCount).length),
            borderColor: 'white',
            borderWidth: 2,
          }],
        })

        // Bar Chart Data
        setStockData({
          labels: Object.keys(categoryStock),
          datasets: [{
            label: 'Stock Quantity',
            data: Object.values(categoryStock),
            backgroundColor: colors.slice(0, Object.keys(categoryStock).length).map(c => c + '99'),
            borderColor: colors.slice(0, Object.keys(categoryStock).length),
            borderWidth: 2,
            borderRadius: 8,
          }],
        })
      }
    } catch (error) {
      console.error('Chart data error:', error)
    }
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
          font: { size: 11 },
        },
      },
      title: {
        display: true,
        text: 'Products by Category',
        font: { size: 14, weight: 'bold' },
        color: '#374151',
        padding: { bottom: 15 },
      },
    },
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Stock by Category',
        font: { size: 14, weight: 'bold' },
        color: '#374151',
        padding: { bottom: 15 },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 10 }, maxRotation: 45 },
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 10 } },
        grid: { color: '#f3e8ff' },
      },
    },
  }

  if (!categoryData || !stockData) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Pie Chart */}
      <div className="glass-card rounded-2xl p-6 card-hover">
        <div className="h-72">
          <Pie data={categoryData} options={pieOptions} />
        </div>
      </div>

      {/* Bar Chart */}
      <div className="glass-card rounded-2xl p-6 card-hover">
        <div className="h-72">
          <Bar data={stockData} options={barOptions} />
        </div>
      </div>
    </div>
  )
}

export default DashboardCharts