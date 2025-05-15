import React from 'react';
import { BarChart, ArrowDownUp, FileText } from 'lucide-react';
import { useInventory } from '../../store/InventoryContext';
import Button from '../../components/common/Button';

const ReportsPage: React.FC = () => {
  const { getStoreStockItems, getStoreRefillItems } = useInventory();
  
  const stockItems = getStoreStockItems();
  const refillItems = getStoreRefillItems();
  
  // Calculate total stock by department
  const stockByDepartment: Record<string, number> = {};
  stockItems.forEach(item => {
    const product = item.sku.substring(0, 3);
    const departmentMap: Record<string, string> = {
      '101': 'T-Shirts',
      '102': 'Jeans',
      '201': 'Footwear',
      '301': 'Bags',
      '302': 'Headwear',
    };
    const department = departmentMap[product] || 'Other';
    
    if (!stockByDepartment[department]) {
      stockByDepartment[department] = 0;
    }
    stockByDepartment[department] += item.quantity;
  });
  
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
    alert('Export functionality would generate a CSV/PDF file in a real application');
  };
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
            <BarChart className="mr-2" size={24} />
            Inventory Reports
          </h1>
          <p className="text-gray-600">View and export inventory reports.</p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={exportReport}
          icon={<FileText size={18} />}
        >
          Export Report
        </Button>
      </div>
      
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
            <BarChart size={20} className="mr-2 text-green-500" />
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
        <h3 className="text-lg font-medium mb-4">Recent Activity Log</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Box Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Combine and sort stock and refill items by timestamp */}
              {[...stockItems.map(item => ({
                type: 'Stock Added',
                date: new Date(item.timestamp),
                boxNumber: item.boxNumber,
                quantity: item.quantity,
              })), ...refillItems.map(item => ({
                type: 'Refill',
                date: new Date(item.timestamp),
                boxNumber: item.boxNumber,
                quantity: item.quantity,
              }))]
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .slice(0, 10)
                .map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.date.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.type === 'Stock Added' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.boxNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;