import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { FaBars, FaTimes } from 'react-icons/fa'

const AdminLayout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden main-bg">
        {/* Navbar */}
        <header className="bg-white/40 backdrop-blur-xl border-b border-white/30 px-4 lg:px-8 py-4 sticky top-0 z-30 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2.5 bg-white/50 rounded-xl text-purple-700 hover:bg-white/70 transition-all"
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                  Eshvar Murti Kala Kendra
                </h2>
                <p className="text-xs text-purple-600/70 hidden sm:block font-medium">Celebrate faith responsibly — preserve nature beautifully.</p>
              </div>
            </div>
            <Navbar onLogout={onLogout} />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout