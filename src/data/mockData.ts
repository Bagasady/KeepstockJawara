import { Product, StockItem, RefillItem, User } from '../types';

// Mock Users for Authentication
export const MOCK_USERS: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    store: 'XPTN Store',
  },
  {
    username: 'XPTN',
    password: '@JC5008',
    store: 'XPTN Store',
  },
  {
    username: 'XPDN',
    password: '@JC2004',
    store: 'XPDN Store',
  },
];

// Mock Products Database
export const MOCK_PRODUCTS: Product[] = [
  // T-Shirts Department (101)
  {
    sku: '101001',
    name: 'Premium Cotton T-Shirt Black',
    price: 125000,
    rack: 'A1-01',
    department: 'T-Shirts',
  },
  {
    sku: '101002',
    name: 'Vintage Graphic Tee White',
    price: 95000,
    rack: 'A1-02',
    department: 'T-Shirts',
  },
  {
    sku: '101003',
    name: 'Oversized Basic Tee Navy',
    price: 110000,
    rack: 'A1-03',
    department: 'T-Shirts',
  },
  {
    sku: '101004',
    name: 'Striped Long Sleeve Shirt',
    price: 145000,
    rack: 'A1-04',
    department: 'T-Shirts',
  },
  {
    sku: '101005',
    name: 'Polo Shirt Classic Fit',
    price: 165000,
    rack: 'A1-05',
    department: 'T-Shirts',
  },

  // Jeans Department (102)
  {
    sku: '102001',
    name: 'Slim Fit Dark Wash Jeans',
    price: 285000,
    rack: 'B2-01',
    department: 'Jeans',
  },
  {
    sku: '102002',
    name: 'Straight Cut Light Blue Jeans',
    price: 265000,
    rack: 'B2-02',
    department: 'Jeans',
  },
  {
    sku: '102003',
    name: 'Distressed Skinny Jeans',
    price: 295000,
    rack: 'B2-03',
    department: 'Jeans',
  },
  {
    sku: '102004',
    name: 'High Waist Mom Jeans',
    price: 275000,
    rack: 'B2-04',
    department: 'Jeans',
  },
  {
    sku: '102005',
    name: 'Bootcut Classic Jeans',
    price: 255000,
    rack: 'B2-05',
    department: 'Jeans',
  },

  // Footwear Department (201)
  {
    sku: '201001',
    name: 'Canvas Sneakers White',
    price: 185000,
    rack: 'C3-01',
    department: 'Footwear',
  },
  {
    sku: '201002',
    name: 'Leather Boots Brown',
    price: 425000,
    rack: 'C3-02',
    department: 'Footwear',
  },
  {
    sku: '201003',
    name: 'Running Shoes Black',
    price: 345000,
    rack: 'C3-03',
    department: 'Footwear',
  },
  {
    sku: '201004',
    name: 'Casual Loafers Navy',
    price: 295000,
    rack: 'C3-04',
    department: 'Footwear',
  },
  {
    sku: '201005',
    name: 'High-Top Sneakers Red',
    price: 225000,
    rack: 'C3-05',
    department: 'Footwear',
  },

  // Bags Department (301)
  {
    sku: '301001',
    name: 'Leather Backpack Black',
    price: 385000,
    rack: 'D4-01',
    department: 'Bags',
  },
  {
    sku: '301002',
    name: 'Canvas Tote Bag Beige',
    price: 125000,
    rack: 'D4-02',
    department: 'Bags',
  },
  {
    sku: '301003',
    name: 'Crossbody Messenger Bag',
    price: 245000,
    rack: 'D4-03',
    department: 'Bags',
  },
  {
    sku: '301004',
    name: 'Travel Duffel Bag Gray',
    price: 325000,
    rack: 'D4-04',
    department: 'Bags',
  },
  {
    sku: '301005',
    name: 'Mini Shoulder Bag Pink',
    price: 165000,
    rack: 'D4-05',
    department: 'Bags',
  },

  // Headwear Department (302)
  {
    sku: '302001',
    name: 'Baseball Cap Black',
    price: 85000,
    rack: 'E5-01',
    department: 'Headwear',
  },
  {
    sku: '302002',
    name: 'Beanie Wool Gray',
    price: 65000,
    rack: 'E5-02',
    department: 'Headwear',
  },
  {
    sku: '302003',
    name: 'Bucket Hat Khaki',
    price: 75000,
    rack: 'E5-03',
    department: 'Headwear',
  },
  {
    sku: '302004',
    name: 'Snapback Cap White',
    price: 95000,
    rack: 'E5-04',
    department: 'Headwear',
  },
  {
    sku: '302005',
    name: 'Fedora Hat Brown',
    price: 145000,
    rack: 'E5-05',
    department: 'Headwear',
  },
];

// Mock Stock Items
export const MOCK_STOCK_ITEMS: StockItem[] = [
  // XPTN Store Stock
  {
    id: '1',
    sku: '101001',
    quantity: 25,
    boxNumber: 'XPTN-BOX-001',
    timestamp: '2024-01-15T10:30:00Z',
    storeName: 'XPTN Store',
  },
  {
    id: '2',
    sku: '101002',
    quantity: 18,
    boxNumber: 'XPTN-BOX-002',
    timestamp: '2024-01-15T11:15:00Z',
    storeName: 'XPTN Store',
  },
  {
    id: '3',
    sku: '102001',
    quantity: 12,
    boxNumber: 'XPTN-BOX-003',
    timestamp: '2024-01-16T09:45:00Z',
    storeName: 'XPTN Store',
  },
  {
    id: '4',
    sku: '201001',
    quantity: 30,
    boxNumber: 'XPTN-BOX-004',
    timestamp: '2024-01-16T14:20:00Z',
    storeName: 'XPTN Store',
  },
  {
    id: '5',
    sku: '301001',
    quantity: 8,
    boxNumber: 'XPTN-BOX-005',
    timestamp: '2024-01-17T08:30:00Z',
    storeName: 'XPTN Store',
  },
  {
    id: '6',
    sku: '302001',
    quantity: 22,
    boxNumber: 'XPTN-BOX-006',
    timestamp: '2024-01-17T16:45:00Z',
    storeName: 'XPTN Store',
  },
  {
    id: '7',
    sku: '101003',
    quantity: 15,
    boxNumber: 'XPTN-BOX-007',
    timestamp: '2024-01-18T10:00:00Z',
    storeName: 'XPTN Store',
  },
  {
    id: '8',
    sku: '102002',
    quantity: 20,
    boxNumber: 'XPTN-BOX-008',
    timestamp: '2024-01-18T13:30:00Z',
    storeName: 'XPTN Store',
  },

  // XPDN Store Stock
  {
    id: '9',
    sku: '101001',
    quantity: 28,
    boxNumber: 'XPDN-BOX-001',
    timestamp: '2024-01-15T09:00:00Z',
    storeName: 'XPDN Store',
  },
  {
    id: '10',
    sku: '201002',
    quantity: 14,
    boxNumber: 'XPDN-BOX-002',
    timestamp: '2024-01-16T11:30:00Z',
    storeName: 'XPDN Store',
  },
  {
    id: '11',
    sku: '301002',
    quantity: 16,
    boxNumber: 'XPDN-BOX-003',
    timestamp: '2024-01-17T15:15:00Z',
    storeName: 'XPDN Store',
  },
  {
    id: '12',
    sku: '102003',
    quantity: 11,
    boxNumber: 'XPDN-BOX-004',
    timestamp: '2024-01-18T12:00:00Z',
    storeName: 'XPDN Store',
  },
];

// Mock Refill Items
export const MOCK_REFILL_ITEMS: RefillItem[] = [
  {
    id: '1',
    boxNumber: 'XPTN-BOX-001',
    quantity: 5,
    timestamp: '2024-01-19T10:30:00Z',
    storeName: 'XPTN Store',
  },
  {
    id: '2',
    boxNumber: 'XPTN-BOX-003',
    quantity: 8,
    timestamp: '2024-01-19T14:15:00Z',
    storeName: 'XPTN Store',
  },
  {
    id: '3',
    boxNumber: 'XPDN-BOX-001',
    quantity: 12,
    timestamp: '2024-01-20T09:45:00Z',
    storeName: 'XPDN Store',
  },
  {
    id: '4',
    boxNumber: 'XPTN-BOX-002',
    quantity: 6,
    timestamp: '2024-01-20T16:20:00Z',
    storeName: 'XPTN Store',
  },
  {
    id: '5',
    boxNumber: 'XPDN-BOX-002',
    quantity: 4,
    timestamp: '2024-01-21T11:00:00Z',
    storeName: 'XPDN Store',
  },
];

// Helper function to generate box numbers
export const generateBoxNumber = (storeName: string, existingBoxes: string[]): string => {
  const storeCode = storeName.split(' ')[0]; // Get XPTN or XPDN
  
  // Find the highest existing box number for this store
  const storeBoxes = existingBoxes.filter(box => box.startsWith(storeCode));
  let maxNumber = 0;
  
  storeBoxes.forEach(box => {
    const parts = box.split('-');
    if (parts.length === 3) {
      const number = parseInt(parts[2], 10);
      if (number > maxNumber) {
        maxNumber = number;
      }
    }
  });
  
  const nextNumber = maxNumber + 1;
  return `${storeCode}-BOX-${nextNumber.toString().padStart(3, '0')}`;
};

// Helper function to get department from SKU
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

// Sample data for testing different scenarios
export const SAMPLE_SCENARIOS = {
  // Low stock scenario
  lowStockItems: MOCK_STOCK_ITEMS.filter(item => item.quantity < 15),
  
  // High volume boxes
  highVolumeBoxes: MOCK_STOCK_ITEMS.filter(item => item.quantity > 20),
  
  // Recent activity (last 7 days)
  recentActivity: [
    ...MOCK_STOCK_ITEMS.filter(item => {
      const itemDate = new Date(item.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return itemDate > weekAgo;
    }),
    ...MOCK_REFILL_ITEMS.filter(item => {
      const itemDate = new Date(item.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return itemDate > weekAgo;
    }),
  ],
};