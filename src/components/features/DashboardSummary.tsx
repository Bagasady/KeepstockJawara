import React from 'react';
import { Package, TrendingUp, Clock, BarChart } from 'lucide-react';
import { useInventory } from '../../store/InventoryContext';
import { useAuth } from '../../store/AuthContext';

const DashboardSummary: React.FC = () => {
  const { getStoreStockItems, getUniqueBoxNumbers, getStoreRefillItems } = useInventory();
  const { authState } = useAuth();
  
  const stockItems = getStoreStockItems();
  const boxNumbers = getUniqueBoxNumbers();
  const refillItems = getStoreRefillItems();
  
  const totalStockQuantity = stockItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalRefillQuantity = refillItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Get the most recent activity (either stock or refill)
  const getLatestActivity = () => {
    const allActivities = [
      ...stockItems.map(item => ({ type: 'stock', date: new Date(item.timestamp), boxNumber: item.boxNumber })),
      ...refillItems.map(item => ({ type: 'refill', date: new Date(item.timestamp), boxNumber: item.boxNumber })),
    ];
    
    allActivities.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    return allActivities[0] || null;
  };
  
  const latestActivity = getLatestActivity();
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Stock */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-start">
        <div className="mr-4 bg-blue-100 p-3 rounded-lg">
          <Package className="text-blue-600" size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Stock</p>
          <h3 className="text-2xl font-semibold">{totalStockQuantity}</h3>
          <p className="text-xs text-gray-400">{authState.user?.store}</p>
        </div>
      </div>
      
      {/* Total Boxes */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-start">
        <div className="mr-4 bg-purple-100 p-3 rounded-lg">
          <BarChart className="text-purple-600" size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Boxes</p>
          <h3 className="text-2xl font-semibold">{boxNumbers.length}</h3>
          <p className="text-xs text-gray-400">Unique box count</p>
        </div>
      </div>
      
      {/* Total Refills */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-start">
        <div className="mr-4 bg-green-100 p-3 rounded-lg">
          <TrendingUp className="text-green-600" size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Refills</p>
          <h3 className="text-2xl font-semibold">{totalRefillQuantity}</h3>
          <p className="text-xs text-gray-400">Items refilled</p>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-start">
        <div className="mr-4 bg-amber-100 p-3 rounded-lg">
          <Clock className="text-amber-600" size={24} />
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Recent Activity</p>
          {latestActivity ? (
            <>
              <h3 className="text-base font-semibold truncate">
                {latestActivity.type === 'stock' ? 'Stock Added' : 'Refill'}
              </h3>
              <p className="text-xs text-gray-400">
                {latestActivity.boxNumber} • {formatDate(latestActivity.date)}
              </p>
            </>
          ) : (
            <h3 className="text-base">No recent activity</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;