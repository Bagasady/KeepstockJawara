import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, title }) => {
  const { authState } = useAuth();
  
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell size={20} className="text-gray-600 hover:text-gray-900 cursor-pointer" />
          <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-white text-xs">
            3
          </span>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-2">
            {authState.user?.username.charAt(0)}
          </div>
          <span className="text-sm font-medium hidden md:block">
            {authState.user?.username}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;