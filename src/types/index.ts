// Core data types for KeepStock XPTN Inventory System

export interface User {
  username: string;
  store: string;
  password?: string; // Only used during login, not stored in state
}

export interface Product {
  sku: string;
  name: string;
  price: number;
  rack: string;
  department: string;
}

export interface StockItem {
  id: string;
  sku: string;
  quantity: number;
  boxNumber: string;
  timestamp: string;
  storeName: string;
}

export interface RefillItem {
  id: string;
  boxNumber: string;
  quantity: number;
  timestamp: string;
  storeName: string;
}

export interface Store {
  code: string;
  name: string;
  totalStock: number;
}

// Auth context types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthContextType {
  authState: AuthState;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}