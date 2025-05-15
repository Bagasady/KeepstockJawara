import React from 'react';
import { PackageSearch } from 'lucide-react';
import DashboardSummary from '../../components/features/DashboardSummary';
import StockTable from '../../components/features/StockTable';
import { useInventory } from '../../store/InventoryContext';

const DashboardPage: React.FC = () => {
  const { getStoreStockItems } = useInventory();
  const stockItems = getStoreStockItems();
  
  // Sort by most recent
  const recentStockItems = [...stockItems].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 10);
  
  return (
    <div>
      <DashboardSummary />
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <PackageSearch className="mr-2" size={24} />
            Recent Stock Activity
          </h2>
        </div>
        
        <StockTable items={recentStockItems} showActions />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Quick Statistics</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Charts and statistics will appear here</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Store Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Store Name</p>
              <p className="font-medium">XPTN Store</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Manager</p>
              <p className="font-medium">John Doe</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact</p>
              <p className="font-medium">+62 123 4567 890</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">Jl. Example Street No. 123, Jakarta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;