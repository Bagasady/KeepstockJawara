import React, { useState } from 'react';
import { PackageSearch, AlertTriangle, TrendingUp } from 'lucide-react';
import DashboardSummary from '../../components/features/DashboardSummary';
import StockTable from '../../components/features/StockTable';
import { useInventory } from '../../store/InventoryContext';
import Button from '../../components/common/Button';

const DashboardPage: React.FC = () => {
  const { getStoreStockItems, getLowStockItems } = useInventory();
  const [activeTab, setActiveTab] = useState<'recent' | 'low-stock' | 'all'>('recent');
  
  const stockItems = getStoreStockItems();
  const lowStockItems = getLowStockItems(15);
  
  // Sort by most recent
  const recentStockItems = [...stockItems].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ).slice(0, 10);
  
  const getTabItems = () => {
    switch (activeTab) {
      case 'recent':
        return recentStockItems;
      case 'low-stock':
        return lowStockItems;
      case 'all':
        return stockItems;
      default:
        return recentStockItems;
    }
  };
  
  return (
    <div>
      <DashboardSummary />
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <PackageSearch className="mr-2" size={24} />
            Stock Overview
          </h2>
          
          {lowStockItems.length > 0 && (
            <div className="flex items-center bg-yellow-50 text-yellow-800 px-3 py-2 rounded-lg border border-yellow-200">
              <AlertTriangle size={16} className="mr-2" />
              <span className="text-sm font-medium">
                {lowStockItems.length} items running low
              </span>
            </div>
          )}
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4 w-fit">
          <Button
            variant={activeTab === 'recent' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('recent')}
            className={activeTab === 'recent' ? '' : 'bg-transparent border-none text-gray-600 hover:text-gray-900'}
          >
            Recent Activity
          </Button>
          <Button
            variant={activeTab === 'low-stock' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('low-stock')}
            className={activeTab === 'low-stock' ? '' : 'bg-transparent border-none text-gray-600 hover:text-gray-900'}
            icon={lowStockItems.length > 0 ? <AlertTriangle size={14} /> : undefined}
          >
            Low Stock ({lowStockItems.length})
          </Button>
          <Button
            variant={activeTab === 'all' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? '' : 'bg-transparent border-none text-gray-600 hover:text-gray-900'}
          >
            All Items ({stockItems.length})
          </Button>
        </div>
        
        <StockTable 
          items={getTabItems()} 
          showActions={true}
          enableSearch={activeTab === 'all'}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <TrendingUp className="mr-2 text-blue-500" size={20} />
            Inventory Trends
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Charts and analytics will appear here</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.location.href = '/input-stock'}
            >
              Add New Stock
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.location.href = '/refill'}
            >
              Refill Stock
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.location.href = '/print-sheet'}
            >
              Print Labels
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={() => window.location.href = '/reports'}
            >
              View Reports
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;