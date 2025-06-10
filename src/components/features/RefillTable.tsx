import React, { useState } from 'react';
import { RefillItem } from '../../types';
import { useInventory } from '../../store/InventoryContext';
import { Package, Calendar, Edit, Trash2, Search } from 'lucide-react';
import Button from '../common/Button';
import Input from '../common/Input';
import EditRefillModal from './EditRefillModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface RefillTableProps {
  items?: RefillItem[];
  showActions?: boolean;
  enableSearch?: boolean;
}

const RefillTable: React.FC<RefillTableProps> = ({ 
  items, 
  showActions = false,
  enableSearch = false
}) => {
  const { getStoreRefillItems, deleteRefillItem } = useInventory();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<RefillItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<RefillItem | null>(null);
  
  // Use provided items or get store items
  const allItems = items || getStoreRefillItems();
  
  // Apply search if enabled
  const displayItems = enableSearch && searchQuery.trim() 
    ? allItems.filter(item => 
        item.boxNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allItems;
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleEdit = (item: RefillItem) => {
    setEditingItem(item);
  };

  const handleDelete = (item: RefillItem) => {
    setDeletingItem(item);
  };

  const confirmDelete = () => {
    if (deletingItem) {
      deleteRefillItem(deletingItem.id);
      setDeletingItem(null);
    }
  };
  
  if (displayItems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {enableSearch && (
          <div className="p-4 border-b border-gray-200">
            <Input
              placeholder="Search by box number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
              fullWidth
            />
          </div>
        )}
        <div className="p-8 text-center">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {searchQuery ? 'No matching refills found' : 'No Refill Records'}
          </h3>
          <p className="text-gray-500">
            {searchQuery 
              ? 'Try adjusting your search criteria' 
              : 'There are no refill records to display.'}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {enableSearch && (
          <div className="p-4 border-b border-gray-200">
            <Input
              placeholder="Search by box number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
              fullWidth
            />
          </div>
        )}
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Box Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Refill Quantity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Refilled
                </th>
                {showActions && (
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package size={16} className="mr-2 text-green-500" />
                      <span className="font-medium text-green-600">{item.boxNumber}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      +{item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      {formatDate(item.timestamp)}
                    </div>
                  </td>
                  {showActions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                          icon={<Edit size={14} />}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(item)}
                          icon={<Trash2 size={14} />}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <EditRefillModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={() => setEditingItem(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingItem && (
        <DeleteConfirmModal
          title="Delete Refill Record"
          message={`Are you sure you want to delete this refill record for ${deletingItem.boxNumber}? This action cannot be undone.`}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingItem(null)}
        />
      )}
    </>
  );
};

export default RefillTable;