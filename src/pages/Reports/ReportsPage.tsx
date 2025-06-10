import React, { useState } from 'react';
import { BarChart, ArrowDownUp, FileText, Calendar, Package } from 'lucide-react';
import { useInventory } from '../../store/InventoryContext';
import Button from '../../components/common/Button';
import StockTable from '../../components/features/StockTable';
import RefillTable from '../../components/features/RefillTable';

const ReportsPage: React.FC = () => {
  const { getStoreStockItems, getStoreRefillItems, getStockByDepartment } = useInventory();
  const [activeTab, setActiveTab] = useState<'overview' | 'stock' | 'refills'>('overview');
  
  const stockItems = getStoreStockItems();
  const refillItems = getStoreRefillItems();
  const stockByDepartment = getStockByDepartment();
  
  // Calculate total refills by month
  const refillsByMonth: Record<string, number> = {};
  refillItems.forEach(item => {
    const date = new Date(item.timestamp);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!refillsByMonth[monthYear]) {
      refillsByMonth[monthYear] = 0;
    }
    refillsByMonth[monthYear] += item.quantity;
  });
  
  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      stockItems: stockItems.length,
      totalStock: stockItems.reduce((sum, item) => sum + item.quantity, 0),
      refillItems: refillItems.length,
      totalRefills: refillItems.reduce((sum, item) => sum + item.quantity, 0),
      stockByDepartment,
      refillsByMonth,
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `inventory-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
            <BarChart className="mr-2" size={24} />
            Inventory Reports
          </h1>
          <p className="text-gray-600">View and export comprehensive inventory reports.</p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={exportReport}
          icon={<FileText size={18} />}
        >
          Export Report
        </Button>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
        <Button
          variant={activeTab === 'overview' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('overview')}
          className={activeTab === 'overview' ? '' : 'bg-transparent border-none text-gray-600 hover:text-gray-900'}
          icon={<BarChart size={14} />}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === 'stock' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('stock')}
          className={activeTab === 'stock' ? '' : 'bg-transparent border-none text-gray-600 hover:text-gray-900'}
          icon={<Package size={14} />}
        >
          Stock Items
        </Button>
        <Button
          variant={activeTab === 'refills' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveTab('refills')}
          className={activeTab === 'refills' ? '' : 'bg-transparent border-none text-gray-600 hover:text-gray-900'}
          icon={<ArrowDownUp size={14} />}
        >
          Refill History
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <ArrowDownUp size={20} className="mr-2 text-blue-500" />
                Stock by Department
              </h3>
              
              <div className="space-y-4">
                {Object.entries(stockByDepartment).map(([department, quantity]) => (
                  <div key={department}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{department}</span>
                      <span className="text-sm text-gray-500">{quantity} items</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ 
                          width: `${Math.min(100, (quantity / Math.max(...Object.values(stockByDepartment))) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Calendar size={20} className="mr-2 text-green-500" />
                Refills by Month
              </h3>
              
              <div className="space-y-4">
                {Object.entries(refillsByMonth).map(([month, quantity]) => (
                  <div key={month}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{month}</span>
                      <span className="text-sm text-gray-500">{quantity} items</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ 
                          width: `${Math.min(100, (quantity / Math.max(...Object.values(refillsByMonth))) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium mb-4">Recent Activity Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Total Stock Items</p>
                <p className="text-2xl font-bold text-blue-900">{stockItems.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Total Quantity</p>
                <p className="text-2xl font-bold text-green-900">
                  {stockItems.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">Refill Records</p>
                <p className="text-2xl font-bold text-purple-900">{refillItems.length}</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-600 font-medium">Total Refills</p>
                <p className="text-2xl font-bold text-orange-900">
                  {refillItems.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'stock' && (
        <StockTable 
          items={stockItems} 
          showActions={true}
          enableSearch={true}
        />
      )}

      {activeTab === 'refills' && (
        <RefillTable 
          items={refillItems} 
          showActions={true}
          enableSearch={true}
        />
      )}
    </div>
  );
};

export default ReportsPage;