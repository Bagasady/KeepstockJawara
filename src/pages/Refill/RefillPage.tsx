import React, { useState } from 'react';
import { PackageOpen, CheckCircle2 } from 'lucide-react';
import BoxList from '../../components/features/BoxList';
import RefillForm from '../../components/features/RefillForm';
import { useInventory } from '../../store/InventoryContext';
import { useAuth } from '../../store/AuthContext';

const RefillPage: React.FC = () => {
  const { addRefillItem } = useInventory();
  const { authState } = useAuth();
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleBoxSelect = (boxNumber: string) => {
    setSelectedBox(boxNumber);
    setShowSuccess(false);
  };
  
  const handleRefillSubmit = (quantity: number) => {
    if (!selectedBox || !authState.user) return;
    
    // Add a new refill record
    addRefillItem({
      boxNumber: selectedBox,
      quantity,
      storeName: authState.user.store,
    });
    
    // Show success message and reset
    setShowSuccess(true);
    setSelectedBox(null);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };
  
  const handleRefillCancel = () => {
    setSelectedBox(null);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800 flex items-center mb-2">
          <PackageOpen className="mr-2" size={24} />
          Refill Stock
        </h1>
        <p className="text-gray-600">
          Select a box to refill its stock.
        </p>
      </div>
      
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center animate-fade-in">
          <CheckCircle2 className="mr-2" size={20} />
          <span>Stock has been successfully refilled!</span>
        </div>
      )}
      
      {selectedBox ? (
        <RefillForm
          boxNumber={selectedBox}
          onSubmit={handleRefillSubmit}
          onCancel={handleRefillCancel}
        />
      ) : (
        <BoxList onSelectBox={handleBoxSelect} />
      )}
    </div>
  );
};

export default RefillPage;