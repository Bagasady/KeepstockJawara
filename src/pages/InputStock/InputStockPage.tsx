import React, { useState } from 'react';
import { PlusCircle, Check } from 'lucide-react';
import StockForm from '../../components/features/StockForm';
import LabelPreview from '../../components/features/LabelPreview';
import { useInventory } from '../../store/InventoryContext';
import { useAuth } from '../../store/AuthContext';
import { StockItem } from '../../types';

const InputStockPage: React.FC = () => {
  const { addStockItem } = useInventory();
  const { authState } = useAuth();
  const [newStockItem, setNewStockItem] = useState<StockItem | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleStockFormSubmit = (data: {
    sku: string;
    quantity: number;
    boxNumber: string;
    productName: string;
  }) => {
    if (!authState.user) return;
    
    // Add the new stock item
    const id = addStockItem({
      sku: data.sku,
      quantity: data.quantity,
      boxNumber: data.boxNumber,
      storeName: authState.user.store,
    });
    
    // Get the newly created stock item
    const createdItem: StockItem = {
      id,
      sku: data.sku,
      quantity: data.quantity,
      boxNumber: data.boxNumber,
      timestamp: new Date().toISOString(),
      storeName: authState.user.store,
    };
    
    setNewStockItem(createdItem);
    setShowSuccess(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };
  
  const handlePrint = () => {
    // In a real application, this would trigger the print functionality
    window.print();
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
          <PlusCircle className="mr-2" size={24} />
          Input New Stock
        </h1>
        <p className="text-gray-600">Add new stock items to your inventory.</p>
      </div>
      
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center animate-fade-in">
          <Check className="mr-2" size={20} />
          <span>Stock item successfully added!</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StockForm onSubmit={handleStockFormSubmit} />
        
        {newStockItem && (
          <LabelPreview 
            stockItem={newStockItem} 
            onPrint={handlePrint} 
          />
        )}
      </div>
    </div>
  );
};

export default InputStockPage;