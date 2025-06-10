import React, { useState } from 'react';
import { X, Package, Save } from 'lucide-react';
import { StockItem } from '../../types';
import { useInventory } from '../../store/InventoryContext';
import Input from '../common/Input';
import Button from '../common/Button';

interface EditStockModalProps {
  item: StockItem;
  onClose: () => void;
  onSave: () => void;
}

const EditStockModal: React.FC<EditStockModalProps> = ({ item, onClose, onSave }) => {
  const { updateStockItem, products } = useInventory();
  const [formData, setFormData] = useState({
    quantity: item.quantity,
    boxNumber: item.boxNumber,
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const product = products.find(p => p.sku === item.sku);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }

    if (!formData.boxNumber.trim()) {
      setError('Box number is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      updateStockItem(item.id, {
        quantity: formData.quantity,
        boxNumber: formData.boxNumber.trim(),
      });
      
      onSave();
    } catch (err) {
      setError('Failed to update stock item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Package className="mr-2 text-blue-500" size={20} />
            Edit Stock Item
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Product Information (Read-only) */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Product Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">SKU</p>
                <p className="font-medium">{item.sku}</p>
              </div>
              <div>
                <p className="text-gray-500">Product Name</p>
                <p className="font-medium">{product?.name || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-gray-500">Department</p>
                <p className="font-medium">{product?.department || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-gray-500">Rack Location</p>
                <p className="font-medium">{product?.rack || 'Unknown'}</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Box Number"
              value={formData.boxNumber}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, boxNumber: e.target.value }));
                setError(null);
              }}
              fullWidth
              required
            />

            <Input
              label="Quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }));
                setError(null);
              }}
              min={1}
              fullWidth
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              icon={isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              ) : (
                <Save size={16} />
              )}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStockModal;