import { Product, StockItem, RefillItem, Store } from '../types';

// Sample user credentials
export const MOCK_USERS = [
  { username: 'XPTN', password: '@JC5008', store: 'XPTN Store' },
  { username: 'XPDN', password: '@JC2004', store: 'XPDN Store' },
];

// Sample products data (from master CSV)
export const MOCK_PRODUCTS: Product[] = [
  { sku: '10100001', name: 'T-Shirt Basic Black', price: 99000, rack: 'A-01-01', department: 'Apparel' },
  { sku: '10100002', name: 'T-Shirt Basic White', price: 99000, rack: 'A-01-02', department: 'Apparel' },
  { sku: '10100003', name: 'T-Shirt Basic Navy', price: 99000, rack: 'A-01-03', department: 'Apparel' },
  { sku: '10200001', name: 'Slim Fit Jeans Blue', price: 299000, rack: 'A-02-01', department: 'Apparel' },
  { sku: '10200002', name: 'Slim Fit Jeans Black', price: 299000, rack: 'A-02-02', department: 'Apparel' },
  { sku: '20100001', name: 'Running Shoes White', price: 599000, rack: 'B-01-01', department: 'Footwear' },
  { sku: '20100002', name: 'Running Shoes Black', price: 599000, rack: 'B-01-02', department: 'Footwear' },
  { sku: '30100001', name: 'Backpack 15L Grey', price: 199000, rack: 'C-01-01', department: 'Accessories' },
  { sku: '30100002', name: 'Backpack 15L Black', price: 199000, rack: 'C-01-02', department: 'Accessories' },
  { sku: '30200001', name: 'Cap Black', price: 129000, rack: 'C-02-01', department: 'Accessories' },
];

// Sample stores data
export const MOCK_STORES: Store[] = [
  { code: 'XPTN', name: 'XPTN Store', totalStock: 125 },
  { code: 'XPDN', name: 'XPDN Store', totalStock: 98 },
];

// Initial stock items
export const MOCK_STOCK_ITEMS: StockItem[] = [
  { 
    id: '1',
    sku: '10100001', 
    quantity: 25, 
    boxNumber: 'XPTN-BOX-001', 
    timestamp: '2025-01-15T09:30:00', 
    storeName: 'XPTN Store' 
  },
  { 
    id: '2',
    sku: '10200001', 
    quantity: 15, 
    boxNumber: 'XPTN-BOX-002', 
    timestamp: '2025-01-15T10:15:00', 
    storeName: 'XPTN Store' 
  },
  { 
    id: '3',
    sku: '20100001', 
    quantity: 10, 
    boxNumber: 'XPDN-BOX-001', 
    timestamp: '2025-01-14T14:20:00', 
    storeName: 'XPDN Store' 
  },
];

// Initial refill history
export const MOCK_REFILL_ITEMS: RefillItem[] = [
  { 
    id: '1',
    boxNumber: 'XPTN-BOX-001', 
    quantity: 5, 
    timestamp: '2025-01-16T11:30:00', 
    storeName: 'XPTN Store' 
  },
  { 
    id: '2',
    boxNumber: 'XPDN-BOX-001', 
    quantity: 3, 
    timestamp: '2025-01-17T09:45:00', 
    storeName: 'XPDN Store' 
  },
];

// Helper function to find a product by SKU
export const findProductBySku = (sku: string): Product | undefined => {
  return MOCK_PRODUCTS.find(product => product.sku === sku);
};

// Helper to get department from SKU (first 3 digits)
export const getDepartmentFromSku = (sku: string): string => {
  const departmentCode = sku.substring(0, 3);
  
  const departmentMap: Record<string, string> = {
    '101': 'T-Shirts',
    '102': 'Jeans',
    '201': 'Footwear',
    '301': 'Bags',
    '302': 'Headwear',
  };
  
  return departmentMap[departmentCode] || 'Other';
};

// Generate a new unique box number for a store
export const generateBoxNumber = (storeName: string, existingBoxes: string[]): string => {
  const storeCode = storeName.split(' ')[0]; // Get the store code (XPTN, XPDN)
  const boxNumbers = existingBoxes.filter(box => box.startsWith(storeCode));
  
  let maxNumber = 0;
  boxNumbers.forEach(boxNumber => {
    const parts = boxNumber.split('-');
    if (parts.length === 3) {
      const number = parseInt(parts[2], 10);
      if (!isNaN(number) && number > maxNumber) {
        maxNumber = number;
      }
    }
  });
  
  const nextNumber = maxNumber + 1;
  return `${storeCode}-BOX-${nextNumber.toString().padStart(3, '0')}`;
};