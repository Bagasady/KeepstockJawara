import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AuthState, AuthContextType, User } from '../types';
import { MOCK_USERS } from '../data/mockData';

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>({
  authState: initialAuthState,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Check if user is already logged in from localStorage
    const savedUser = localStorage.getItem('keepstock_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser) as User;
        return {
          user,
          isAuthenticated: true,
        };
      } catch (e) {
        // Invalid stored data
        localStorage.removeItem('keepstock_user');
      }
    }
    return initialAuthState;
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const user = MOCK_USERS.find(
      u => u.username === username && u.password === password
    );
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setAuthState({
        user: userWithoutPassword,
        isAuthenticated: true,
      });
      // Save to localStorage
      localStorage.setItem('keepstock_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setAuthState(initialAuthState);
    localStorage.removeItem('keepstock_user');
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};