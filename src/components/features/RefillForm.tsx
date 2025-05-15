import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { Package as Packages } from 'lucide-react';

interface RefillFormProps {
  boxNumber: string;
  onSubmit: (quantity: number) => void;
  onCancel: () => void;
}

const RefillForm: React.FC<RefillFormProps> = ({ 
  boxNumber, 
  onSubmit, 
  onCancel 
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (quantity <= 0) {
      setError('Refill quantity must be greater than 0');
      return;
    }
    
    onSubmit(quantity);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
      <div className="flex items-center mb-4">
        <Packages className="text-blue-500 mr-2" size={20} />
        <h3 className="text-lg font-medium">Refill Box: {boxNumber}</h3>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Refill Quantity"
          type="number"
          value={quantity}
          onChange={(e) => {
            setQuantity(parseInt(e.target.value) || 0);
            setError(null);
          }}
          min={1}
          error={error || undefined}
          fullWidth
          className="mb-6"
        />
        
        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="success"
          >
            Confirm Refill
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RefillForm;