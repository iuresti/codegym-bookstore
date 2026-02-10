import { createContext, useState, useEffect } from 'react';
import { cartService } from '../services/cart/cartService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart when user ID changes
  const loadCart = async (userId) => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const result = await cartService.getCart(userId);
      if (result.success) {
        setCart(result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Error al cargar el carrito');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (userId, bookId, title, price, quantity = 1) => {
    setLoading(true);
    setError(null);
    try {
      const result = await cartService.addToCart(userId, bookId, title, price, quantity);
      if (result.success) {
        setCart(result.data);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Error al agregar al carrito');
      return { success: false, error: 'Error al agregar al carrito' };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (userId, bookId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await cartService.removeFromCart(userId, bookId);
      if (result.success) {
        setCart(result.data);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Error al eliminar del carrito');
      return { success: false, error: 'Error al eliminar del carrito' };
    } finally {
      setLoading(false);
    }
  };

  const updateItemQuantity = async (userId, bookId, quantity) => {
    setLoading(true);
    setError(null);
    try {
      const result = await cartService.updateItemQuantity(userId, bookId, quantity);
      if (result.success) {
        setCart(result.data);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Error al actualizar cantidad');
      return { success: false, error: 'Error al actualizar cantidad' };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await cartService.clearCart(userId);
      if (result.success) {
        setCart(result.data);
        return { success: true };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      setError('Error al vaciar carrito');
      return { success: false, error: 'Error al vaciar carrito' };
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cart ? cart.total || 0 : 0;
  };

  const getCartItemCount = () => {
    return cart ? cart.items.length : 0;
  };

  const value = {
    cart,
    loading,
    error,
    loadCart,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

