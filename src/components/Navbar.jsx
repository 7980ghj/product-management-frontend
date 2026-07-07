import { FaBell, FaSignOutAlt } from 'react-icons/fa'

const Navbar = ({ onLogout }) => {
  const user = JSON.parse(localStorage.getItem('adminUser'))

  return (
    <div className="flex items-center gap-3">
      {/* Notifications */}
      <button className="relative p-2.5 bg-white/50 rounded-xl text-purple-500 hover:text-purple-700 hover:bg-white/70 transition-all duration-200 border border-white/30">
        <FaBell className="text-lg" />
        <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse-slow">
          3
        </span>
      </button>

      {/* Admin Profile */}
      <div className="flex items-center gap-3 bg-white/50 border border-white/30 rounded-xl px-4 py-2 backdrop-blur-sm">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-400 rounded-lg flex items-center justify-center shadow-sm">
          <span className="text-white text-sm font-bold">
            {user?.username?.charAt(0).toUpperCase() || 'A'}
          </span>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-gray-800">{user?.username || 'Admin'}</p>
          <p className="text-[10px] text-purple-500">{user?.email || ''}</p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="p-2.5 bg-red-50 rounded-xl text-red-500 hover:text-red-700 hover:bg-red-100 transition-all duration-200 border border-red-100"
        title="Logout"
      >
        <FaSignOutAlt className="text-lg" />
      </button>
    </div>
  )
}

export default Navbar