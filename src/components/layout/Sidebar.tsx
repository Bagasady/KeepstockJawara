import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  PackageOpen, 
  Printer, 
  LogOut,
  BarChart,
} from 'lucide-react';
import { useAuth } from '../../store/AuthContext';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();
  const { authState, logout } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/input-stock', name: 'Input Stock', icon: <PlusCircle size={20} /> },
    { path: '/refill', name: 'Refill Stock', icon: <PackageOpen size={20} /> },
    { path: '/print-sheet', name: 'Print Sheet', icon: <Printer size={20} /> },
    { path: '/reports', name: 'Reports', icon: <BarChart size={20} /> },
  ];

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-blue-900 text-white h-screen fixed top-0 left-0 transition-all duration-300 z-20`}>
      <div className="p-4 flex items-center justify-between border-b border-blue-800">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <PackageOpen size={24} />
            <h1 className="text-xl font-bold">KeepStock</h1>
          </div>
        )}
        {collapsed && <PackageOpen className="mx-auto" size={24} />}
        <button 
          onClick={toggleSidebar}
          className="text-white hover:text-blue-200 transition-colors"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      <div className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center px-4 py-3 transition-colors
              ${isActive(item.path) ? 'bg-blue-800 border-r-4 border-blue-400' : 'hover:bg-blue-800'}
            `}
          >
            <div className={`${collapsed ? 'mx-auto' : 'mr-3'}`}>{item.icon}</div>
            {!collapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full border-t border-blue-800">
        {!collapsed && (
          <div className="px-4 py-3">
            <p className="text-sm text-blue-300">{authState.user?.store}</p>
            <p className="text-xs opacity-70">Logged in as {authState.user?.username}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center w-full px-4 py-3 transition-colors hover:bg-blue-800 text-left"
        >
          <div className={`${collapsed ? 'mx-auto' : 'mr-3'} text-red-400`}>
            <LogOut size={20} />
          </div>
          {!collapsed && <span className="text-red-400">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;