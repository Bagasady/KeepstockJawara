import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Map routes to title names
  const getPageTitle = () => {
    const pathToTitle: Record<string, string> = {
      '/dashboard': 'Dashboard',
      '/input-stock': 'Input Stock',
      '/refill': 'Refill Stock',
      '/print-sheet': 'Print Labels',
      '/reports': 'Reports',
    };
    
    return pathToTitle[location.pathname] || 'KeepStock XPTN';
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header toggleSidebar={toggleSidebar} title={getPageTitle()} />
        
        <main className="p-6 bg-gray-50 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;