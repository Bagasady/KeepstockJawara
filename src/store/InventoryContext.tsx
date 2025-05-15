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
  addRefillItem: (item: Omit<RefillItem, 'id' | 'timestamp'>) => void;
  getStoreStockItems: () => StockItem[];
  getStoreRefillItems: () => RefillItem[];
  getTotalStockForStore: () => number;
  getUniqueBoxNumbers: () => string[];
  generateNewBoxNumber: () => string;
  getProductBySkuForStore: (sku: string) => Product | undefined;
}

const InventoryContext = createContext<InventoryContextType>({
  products: [],
  stockItems: [],
  refillItems: [],
  addStockItem: () => '',
  addRefillItem: () => {},
  getStoreStockItems: () => [],
  getStoreRefillItems: () => [],
  getTotalStockForStore: () => 0,
  getUniqueBoxNumbers: () => [],
  generateNewBoxNumber: () => '',
  getProductBySkuForStore: () => undefined,
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
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    setStockItems(prev => [...prev, newItem]);
    return newItem.id;
  };

  const addRefillItem = (item: Omit<RefillItem, 'id' | 'timestamp'>): void => {
    const newItem: RefillItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    setRefillItems(prev => [...prev, newItem]);
  };

  const getProductBySkuForStore = (sku: string): Product | undefined => {
    return products.find(p => p.sku === sku);
  };

  const value = {
    products,
    stockItems,
    refillItems,
    addStockItem,
    addRefillItem,
    getStoreStockItems,
    getStoreRefillItems,
    getTotalStockForStore,
    getUniqueBoxNumbers,
    generateNewBoxNumber,
    getProductBySkuForStore,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};