import { NavLink } from 'react-router-dom'
import { FaHome, FaBoxOpen, FaPlusCircle, FaChartBar, FaInfoCircle } from 'react-icons/fa'

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: <FaHome /> },
    { name: 'Products', path: '/products', icon: <FaBoxOpen /> },
    { name: 'Add Product', path: '/products/add', icon: <FaPlusCircle /> },
    { name: 'About Us', path: '/about', icon: <FaInfoCircle /> },
  ]

  return (
    <aside className="w-72 sidebar-gradient text-white flex flex-col min-h-screen shadow-2xl relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-0 w-32 h-32 bg-purple-400/10 rounded-full -mr-16"></div>
      <div className="absolute bottom-32 left-0 w-24 h-24 bg-pink-400/10 rounded-full -ml-12"></div>
      <div className="absolute top-1/2 right-4 w-2 h-2 bg-white/30 rounded-full animate-twinkle"></div>
      <div className="absolute top-1/3 left-6 w-1.5 h-1.5 bg-white/20 rounded-full animate-twinkle" style={{animationDelay: '1s'}}></div>

      {/* Logo Section */}
      <div className="p-6 border-b border-purple-400/20 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
            🪔
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide text-purple-50">Murti Admin</h1>
            <p className="text-purple-300/60 text-[10px] font-semibold tracking-widest uppercase">Eshvar Kala Kendra</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 mt-2 relative z-10">
        <p className="text-[10px] font-bold text-purple-300/40 uppercase tracking-[0.2em] mb-4 px-4">Navigation</p>
        <ul className="space-y-1.5">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/20 text-white font-semibold border border-purple-400/20 shadow-lg shadow-purple-900/20'
                      : 'text-purple-200/60 hover:bg-white/5 hover:text-purple-100'
                  }`
                }
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                <span className="text-sm">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick Stats Card */}
      <div className="mx-4 mb-4 p-4 bg-gradient-to-r from-purple-500/15 to-pink-500/10 rounded-xl border border-purple-400/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-400/20 rounded-lg flex items-center justify-center">
            <FaChartBar className="text-purple-300" />
          </div>
          <div>
            <p className="text-[10px] text-purple-300/60 font-medium uppercase tracking-wider">Store</p>
            <p className="text-sm font-semibold text-purple-100">View Analytics</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar