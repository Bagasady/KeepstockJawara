import mysql from 'mysql2/promise';
import { Product, StockItem, RefillItem, Store } from '../types';

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'keepstock_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// User authentication
export const authenticateUser = async (username: string, password: string) => {
  const [rows] = await pool.query(
    'SELECT username, store FROM users WHERE username = ? AND password = ?',
    [username, password]
  );
  return (rows as any[])[0];
};

// Product operations
export const getProducts = async (): Promise<Product[]> => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows as Product[];
};

export const findProductBySku = async (sku: string): Promise<Product | undefined> => {
  const [rows] = await pool.query('SELECT * FROM products WHERE sku = ?', [sku]);
  const products = rows as Product[];
  return products[0];
};

// Stock operations
export const getStockItems = async (): Promise<StockItem[]> => {
  const [rows] = await pool.query('SELECT * FROM stock_items ORDER BY timestamp DESC');
  return rows as StockItem[];
};

export const addStockItem = async (item: Omit<StockItem, 'id' | 'timestamp'>): Promise<string> => {
  const id = Date.now().toString();
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  await pool.query(
    'INSERT INTO stock_items (id, sku, quantity, box_number, timestamp, store_name) VALUES (?, ?, ?, ?, ?, ?)',
    [id, item.sku, item.quantity, item.boxNumber, timestamp, item.storeName]
  );
  
  return id;
};

// Refill operations
export const getRefillItems = async (): Promise<RefillItem[]> => {
  const [rows] = await pool.query('SELECT * FROM refill_items ORDER BY timestamp DESC');
  return rows as RefillItem[];
};

export const addRefillItem = async (item: Omit<RefillItem, 'id' | 'timestamp'>): Promise<void> => {
  const id = Date.now().toString();
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
  await pool.query(
    'INSERT INTO refill_items (id, box_number, quantity, timestamp, store_name) VALUES (?, ?, ?, ?, ?)',
    [id, item.boxNumber, item.quantity, timestamp, item.storeName]
  );
};

// Store operations
export const getStores = async (): Promise<Store[]> => {
  const [rows] = await pool.query('SELECT * FROM stores');
  return rows as Store[];
};

// Helper functions
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

export const generateBoxNumber = async (storeName: string): Promise<string> => {
  const storeCode = storeName.split(' ')[0]; // Get the store code (XPTN, XPDN)
  
  // Get the latest box number for this store
  const [rows] = await pool.query(
    'SELECT box_number FROM stock_items WHERE store_name = ? ORDER BY box_number DESC LIMIT 1',
    [storeName]
  );
  
  const existingBoxes = rows as { box_number: string }[];
  let maxNumber = 0;
  
  if (existingBoxes.length > 0) {
    const lastBox = existingBoxes[0].box_number;
    const parts = lastBox.split('-');
    if (parts.length === 3) {
      maxNumber = parseInt(parts[2], 10) || 0;
    }
  }
  
  const nextNumber = maxNumber + 1;
  return `${storeCode}-BOX-${nextNumber.toString().padStart(3, '0')}`;
};

// Error handling wrapper
export const withErrorHandling = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    console.error('Database operation failed:', error);
    throw new Error('Database operation failed. Please try again later.');
  }
};

// Initialize database connection
export const initializeDatabase = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection established successfully');
    connection.release();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw new Error('Database connection failed');
  }
};