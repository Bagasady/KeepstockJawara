import React from 'react';
import { Box, ChevronRight, Package } from 'lucide-react';
import { StockItem } from '../../types';
import { useInventory } from '../../store/InventoryContext';

interface BoxListProps {
  onSelectBox: (boxNumber: string) => void;
}

const BoxList: React.FC<BoxListProps> = ({ onSelectBox }) => {
  const { getStoreStockItems, products } = useInventory();
  const stockItems = getStoreStockItems();
  
  // Get unique box numbers
  const boxNumbers = Array.from(new Set(stockItems.map(item => item.boxNumber)));
  
  const getBoxDetails = (boxNumber: string) => {
    const boxItems = stockItems.filter(item => item.boxNumber === boxNumber);
    
    // Total quantity in box
    const totalQuantity = boxItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Find the product names
    const productNames = boxItems.map(item => {
      const product = products.find(p => p.sku === item.sku);
      return product ? product.name : 'Unknown Product';
    });
    
    // Last updated time
    const timestamps = boxItems.map(item => new Date(item.timestamp).getTime());
    const lastUpdated = new Date(Math.max(...timestamps));
    
    return {
      totalQuantity,
      productNames,
      lastUpdated,
    };
  };
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date);
  };
  
  if (boxNumbers.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center">
        <Package size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-1">No Boxes Found</h3>
        <p className="text-gray-500">There are no boxes available for refill.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {boxNumbers.map((boxNumber) => {
        const details = getBoxDetails(boxNumber);
        
        return (
          <div 
            key={boxNumber} 
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
            onClick={() => onSelectBox(boxNumber)}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <Box className="text-blue-500 mr-2" size={20} />
                <h3 className="font-medium text-gray-900">{boxNumber}</h3>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {details.totalQuantity} items
              </span>
            </div>
            
            <div className="mb-3">
              <h4 className="text-xs text-gray-500 uppercase mb-1">Contents</h4>
              <ul className="text-sm">
                {details.productNames.slice(0, 2).map((name, index) => (
                  <li key={index} className="truncate">{name}</li>
                ))}
                {details.productNames.length > 2 && (
                  <li className="text-gray-500 text-sm">
                    +{details.productNames.length - 2} more items
                  </li>
                )}
              </ul>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Last updated: {formatDate(details.lastUpdated)}</span>
              <ChevronRight size={16} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoxList;