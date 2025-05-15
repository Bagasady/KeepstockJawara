import React from 'react';
import { Printer } from 'lucide-react';
import Button from '../common/Button';
import { StockItem } from '../../types';
import { useInventory } from '../../store/InventoryContext';

interface LabelPreviewProps {
  stockItem: StockItem;
  onPrint: () => void;
}

const LabelPreview: React.FC<LabelPreviewProps> = ({ stockItem, onPrint }) => {
  const { products } = useInventory();
  
  const product = products.find(p => p.sku === stockItem.sku);
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    }).format(date);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Label Preview</h3>
        <Button 
          onClick={onPrint}
          icon={<Printer size={18} />}
          variant="primary"
        >
          Print Label
        </Button>
      </div>
      
      {/* Label Preview */}
      <div className="border-2 border-dashed border-gray-300 p-6 mb-6">
        <div className="w-full max-w-[400px] mx-auto bg-white border border-gray-300 p-4">
          <div className="border-b-2 border-gray-900 pb-2 mb-4">
            <h2 className="text-xl font-bold text-center">KEEPSTOCK XPTN</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500">BOX NUMBER</p>
              <p className="text-lg font-bold">{stockItem.boxNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">QUANTITY</p>
              <p className="text-lg font-bold">{stockItem.quantity}</p>
            </div>
          </div>
          
          <div className="mb-4">
            <p className="text-xs text-gray-500">PRODUCT</p>
            <p className="font-medium">{product.name}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-500">SKU</p>
              <p>{stockItem.sku}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">RACK LOCATION</p>
              <p>{product.rack}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">DEPARTMENT</p>
              <p>{product.department}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">DATE</p>
              <p>{formatDate(stockItem.timestamp)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded text-sm">
        <p className="text-blue-800">
          <strong>Printing Instructions:</strong> This label will be printed on standard A4 paper. Make sure your printer is correctly configured.
        </p>
      </div>
    </div>
  );
};

export default LabelPreview;