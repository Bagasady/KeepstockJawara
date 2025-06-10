import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { StockItem, RefillItem, Product } from '../types';
import { 
  MOCK_STOCK_ITEMS, 
  MOCK_REFILL_ITEMS, 
  MOCK_PRODUCTS,
  generateBoxNumber 
} from '../data/mockData';
import { useAuth } from './AuthContext';

interface InventoryContextType {
  products: Product[];
  stockItems: StockItem[];
  refillItems: RefillItem[];
  addStockItem: (item: Omit<StockItem, 'id' | 'timestamp'>) => string;
  updateStockItem: (id: string, updates: Partial<StockItem>) => boolean;
  deleteStockItem: (id: string) => boolean;
  addRefillItem: (item: Omit<RefillItem, 'id' | 'timestamp'>) => void;
  updateRefillItem: (id: string, updates: Partial<RefillItem>) => boolean;
  deleteRefillItem: (id: string) => boolean;
  getStoreStockItems: () => StockItem[];
  getStoreRefillItems: () => RefillItem[];
  getTotalStockForStore: () => number;
  getUniqueBoxNumbers: () => string[];
  generateNewBoxNumber: () => string;
  getProductBySkuForStore: (sku: string) => Product | undefined;
  getStockItemById: (id: string) => StockItem | undefined;
  getRefillItemById: (id: string) => RefillItem | undefined;
  searchStockItems: (query: string) => StockItem[];
  getStockByDepartment: () => Record<string, number>;
  getLowStockItems: (threshold?: number) => StockItem[];
}

const InventoryContext = createContext<InventoryContextType>({
  products: [],
  stockItems: [],
  refillItems: [],
  addStockItem: () => '',
  updateStockItem: () => false,
  deleteStockItem: () => false,
  addRefillItem: () => {},
  updateRefillItem: () => false,
  deleteRefillItem: () => false,
  getStoreStockItems: () => [],
  getStoreRefillItems: () => [],
  getTotalStockForStore: () => 0,
  getUniqueBoxNumbers: () => [],
  generateNewBoxNumber: () => '',
  getProductBySkuForStore: () => undefined,
  getStockItemById: () => undefined,
  getRefillItemById: () => undefined,
  searchStockItems: () => [],
  getStockByDepartment: () => ({}),
  getLowStockItems: () => [],
});

export const useInventory = () => useContext(InventoryContext);

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const { authState } = useAuth();
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [stockItems, setStockItems] = useState<StockItem[]>(() => {
    const savedItems = localStorage.getItem('keepstock_stock_items');
    return savedItems ? JSON.parse(savedItems) : MOCK_STOCK_ITEMS;
  });
  const [refillItems, setRefillItems] = useState<RefillItem[]>(() => {
    const savedItems = localStorage.getItem('keepstock_refill_items');
    return savedItems ? JSON.parse(savedItems) : MOCK_REFILL_ITEMS;
  });

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('keepstock_stock_items', JSON.stringify(stockItems));
  }, [stockItems]);

  useEffect(() => {
    localStorage.setItem('keepstock_refill_items', JSON.stringify(refillItems));
  }, [refillItems]);

  const getStoreStockItems = (): StockItem[] => {
    if (!authState.user) return [];
    return stockItems.filter(item => item.storeName === authState.user.store);
  };

  const getStoreRefillItems = (): RefillItem[] => {
    if (!authState.user) return [];
    return refillItems.filter(item => item.storeName === authState.user.store);
  };

  const getTotalStockForStore = (): number => {
    const items = getStoreStockItems();
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getUniqueBoxNumbers = (): string[] => {
    const items = getStoreStockItems();
    return [...new Set(items.map(item => item.boxNumber))];
  };

  const generateNewBoxNumber = (): string => {
    if (!authState.user) return '';
    const existingBoxes = stockItems.map(item => item.boxNumber);
    return generateBoxNumber(authState.user.store, existingBoxes);
  };

  const addStockItem = (item: Omit<StockItem, 'id' | 'timestamp'>): string => {
    const newItem: StockItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    
    setStockItems(prev => [...prev, newItem]);
    return newItem.id;
  };

  const updateStockItem = (id: string, updates: Partial<StockItem>): boolean => {
    setStockItems(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index === -1) return prev;
      
      const updatedItems = [...prev];
      updatedItems[index] = { ...updatedItems[index], ...updates };
      return updatedItems;
    });
    return true;
  };

  const deleteStockItem = (id: string): boolean => {
    setStockItems(prev => prev.filter(item => item.id !== id));
    return true;
  };

  const addRefillItem = (item: Omit<RefillItem, 'id' | 'timestamp'>): void => {
    const newItem: RefillItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };
    
    setRefillItems(prev => [...prev, newItem]);
  };

  const updateRefillItem = (id: string, updates: Partial<RefillItem>): boolean => {
    setRefillItems(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index === -1) return prev;
      
      const updatedItems = [...prev];
      updatedItems[index] = { ...updatedItems[index], ...updates };
      return updatedItems;
    });
    return true;
  };

  const deleteRefillItem = (id: string): boolean => {
    setRefillItems(prev => prev.filter(item => item.id !== id));
    return true;
  };

  const getProductBySkuForStore = (sku: string): Product | undefined => {
    return products.find(p => p.sku === sku);
  };

  const getStockItemById = (id: string): StockItem | undefined => {
    return stockItems.find(item => item.id === id);
  };

  const getRefillItemById = (id: string): RefillItem | undefined => {
    return refillItems.find(item => item.id === id);
  };

  const searchStockItems = (query: string): StockItem[] => {
    const storeItems = getStoreStockItems();
    if (!query.trim()) return storeItems;
    
    const lowercaseQuery = query.toLowerCase();
    return storeItems.filter(item => {
      const product = products.find(p => p.sku === item.sku);
      return (
        item.sku.toLowerCase().includes(lowercaseQuery) ||
        item.boxNumber.toLowerCase().includes(lowercaseQuery) ||
        (product && product.name.toLowerCase().includes(lowercaseQuery)) ||
        (product && product.department.toLowerCase().includes(lowercaseQuery))
      );
    });
  };

  const getStockByDepartment = (): Record<string, number> => {
    const storeItems = getStoreStockItems();
    const departmentStock: Record<string, number> = {};
    
    storeItems.forEach(item => {
      const product = products.find(p => p.sku === item.sku);
      if (product) {
        if (!departmentStock[product.department]) {
          departmentStock[product.department] = 0;
        }
        departmentStock[product.department] += item.quantity;
      }
    });
    
    return departmentStock;
  };

  const getLowStockItems = (threshold: number = 10): StockItem[] => {
    const storeItems = getStoreStockItems();
    return storeItems.filter(item => item.quantity <= threshold);
  };

  const value = {
    products,
    stockItems,
    refillItems,
    addStockItem,
    updateStockItem,
    deleteStockItem,
    addRefillItem,
    updateRefillItem,
    deleteRefillItem,
    getStoreStockItems,
    getStoreRefillItems,
    getTotalStockForStore,
    getUniqueBoxNumbers,
    generateNewBoxNumber,
    getProductBySkuForStore,
    getStockItemById,
    getRefillItemById,
    searchStockItems,
    getStockByDepartment,
    getLowStockItems,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};