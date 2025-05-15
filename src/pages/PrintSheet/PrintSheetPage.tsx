import React, { useState } from 'react';
import { Printer, Search } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LabelPreview from '../../components/features/LabelPreview';
import { useInventory } from '../../store/InventoryContext';
import { StockItem } from '../../types';

const PrintSheetPage: React.FC = () => {
  const { getStoreStockItems } = useInventory();
  const [searchBoxNumber, setSearchBoxNumber] = useState('');
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const stockItems = getStoreStockItems();
  
  const handleSearch = () => {
    if (!searchBoxNumber.trim()) {
      setError('Please enter a box number');
      return;
    }
    
    const item = stockItems.find(
      item => item.boxNumber.toLowerCase() === searchBoxNumber.toLowerCase()
    );
    
    if (item) {
      setSelectedItem(item);
      setError(null);
    } else {
      setSelectedItem(null);
      setError('Box number not found');
    }
  };
  
  const handlePrint = () => {
    // In a real application, this would trigger the print functionality
    window.print();
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
          <Printer className="mr-2" size={24} />
          Print Box Labels
        </h1>
        <p className="text-gray-600">
          Search for a box number to print its label.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="mb-6">
            <div className="flex space-x-2">
              <Input
                label="Box Number"
                value={searchBoxNumber}
                onChange={(e) => {
                  setSearchBoxNumber(e.target.value);
                  setError(null);
                }}
                placeholder="Enter box number (e.g., XPTN-BOX-001)"
                error={error || undefined}
                fullWidth
              />
              <Button
                type="button"
                onClick={handleSearch}
                icon={<Search size={18} />}
              >
                Search
              </Button>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Recent Boxes</h3>
            <div className="space-y-2">
              {stockItems
                .filter((item, index, self) => 
                  index === self.findIndex((t) => t.boxNumber === item.boxNumber)
                )
                .slice(0, 5)
                .map((item) => (
                  <div 
                    key={item.boxNumber} 
                    className="bg-gray-50 p-3 rounded-md flex items-center justify-between hover:bg-blue-50 cursor-pointer transition-colors"
                    onClick={() => {
                      setSearchBoxNumber(item.boxNumber);
                      setSelectedItem(item);
                    }}
                  >
                    <span className="font-medium">{item.boxNumber}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSearchBoxNumber(item.boxNumber);
                        setSelectedItem(item);
                      }}
                    >
                      Select
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        {selectedItem ? (
          <LabelPreview stockItem={selectedItem} onPrint={handlePrint} />
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center justify-center text-center h-[400px]">
            <Printer size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Label Selected</h3>
            <p className="text-gray-500 max-w-md">
              Search for a box number to preview and print its label.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrintSheetPage;