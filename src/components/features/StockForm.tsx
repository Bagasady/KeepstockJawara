import React, { useState, useEffect } from 'react';
import { Search, AlertCircle, Box, Barcode } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useInventory } from '../../store/InventoryContext';
import { Product } from '../../types';

interface StockFormProps {
  onSubmit: (data: {
    sku: string;
    quantity: number;
    boxNumber: string;
    productName: string;
  }) => void;
}

const StockForm: React.FC<StockFormProps> = ({ onSubmit }) => {
  const { getProductBySkuForStore, generateNewBoxNumber } = useInventory();
  
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [boxNumber, setBoxNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Generate a new box number when the component mounts
    setBoxNumber(generateNewBoxNumber());
  }, [generateNewBoxNumber]);
  
  const handleSkuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSku(value);
    setError(null);
    
    // Clear product data if SKU is empty
    if (!value.trim()) {
      setProduct(null);
    }
  };
  
  const handleSkuSearch = () => {
    if (!sku.trim()) {
      setError('Please enter a SKU');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const foundProduct = getProductBySkuForStore(sku);
      
      if (foundProduct) {
        setProduct(foundProduct);
        setError(null);
      } else {
        setProduct(null);
        setError('Product not found. Please check the SKU.');
      }
      
      setIsLoading(false);
    }, 400);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sku.trim()) {
      setError('Please enter a SKU');
      return;
    }
    
    if (!product) {
      setError('Please search for a valid product first');
      return;
    }
    
    if (quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }
    
    if (!boxNumber.trim()) {
      setError('Box number is required');
      return;
    }
    
    onSubmit({
      sku,
      quantity,
      boxNumber,
      productName: product.name,
    });
    
    // Clear form
    setSku('');
    setQuantity(1);
    setBoxNumber(generateNewBoxNumber());
    setProduct(null);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <div className="flex space-x-2">
          <Input
            label="SKU"
            value={sku}
            onChange={handleSkuChange}
            placeholder="Enter product SKU"
            fullWidth
            icon={<Barcode size={18} />}
          />
          <Button
            type="button"
            onClick={handleSkuSearch}
            disabled={isLoading}
            icon={<Search size={18} />}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>
        {error && (
          <div className="mt-2 flex items-center text-red-600 text-sm">
            <AlertCircle size={16} className="mr-1" />
            {error}
          </div>
        )}
      </div>
      
      {product && (
        <>
          <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-100">
            <h3 className="font-medium text-blue-800 mb-2">Product Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Product Name</p>
                <p className="font-medium">{product.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Department</p>
                <p className="font-medium">{product.department}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Rack Location</p>
                <p className="font-medium">{product.rack}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">Rp {product.price.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Input
              label="Quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              min={1}
              fullWidth
            />
            
            <Input
              label="Box Number"
              value={boxNumber}
              onChange={(e) => setBoxNumber(e.target.value)}
              fullWidth
              icon={<Box size={18} />}
              hint="Auto-generated, but can be modified if needed"
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="lg">
              Save Stock Item
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default StockForm;