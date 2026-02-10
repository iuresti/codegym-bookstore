import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Login } from './components/auth/Login';
import { ClientDashboard } from './pages/ClientDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { NotFoundPage } from './pages/NotFoundPage';

// Client Components
import { BookList } from './components/client/books/BookList';
import { BookDetail } from './components/client/books/BookDetail';
import { CartPage } from './components/client/cart/CartPage';
import { BookRequestForm } from './components/client/requests/BookRequestForm';
import { ClientOrders } from './components/client/orders/ClientOrders';

// Admin Components
import { Dashboard } from './components/admin/dashboard/Dashboard';
import { InventoryList } from './components/admin/inventory/InventoryList';
import { AdminOrders } from './components/admin/orders/AdminOrders';
import { PromotionsList } from './components/admin/promotions/PromotionsList';
import { SalesReport } from './components/admin/reports/SalesReport';
import { AdminBookRequests } from './components/admin/requests/AdminBookRequests';

import './styles/variables.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Client Routes */}
            <Route
              path="/client"
              element={
                <ProtectedRoute requiredRole="CLIENT">
                  <ClientDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="books" element={<BookList />} />
              <Route path="books/:id" element={<BookDetail />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="requests" element={<BookRequestForm />} />
              <Route path="orders" element={<ClientOrders />} />
              <Route index element={<Navigate to="books" replace />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="inventory" element={<InventoryList />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="promotions" element={<PromotionsList />} />
              <Route path="reports" element={<SalesReport />} />
              <Route path="requests" element={<AdminBookRequests />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/client/books" replace />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

