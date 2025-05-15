import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/AuthContext';
import { InventoryProvider } from './store/InventoryContext';
import Layout from './components/layout/Layout';
import LoginPage from './pages/Login/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import InputStockPage from './pages/InputStock/InputStockPage';
import PrintSheetPage from './pages/PrintSheet/PrintSheetPage';
import RefillPage from './pages/Refill/RefillPage';
import ReportsPage from './pages/Reports/ReportsPage';
import './index.css';

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useAuth();
  
  if (!authState.isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="input-stock" element={<InputStockPage />} />
              <Route path="print-sheet" element={<PrintSheetPage />} />
              <Route path="refill" element={<RefillPage />} />
              <Route path="reports" element={<ReportsPage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;