import * as cartMocks from '../../mocks/cartData';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const cartService = {
  // Get user's cart
  async getCart(userId) {
    await delay();
    const cart = cartMocks.getCartByUserId(userId);
    if (cart) {
      return {
        success: true,
        data: {
          ...cart,
          total: cartMocks.getCartTotal(cart),
          isExpired: cartMocks.isCartExpired(cart),
        },
      };
    }
    // Return empty cart if not found
    return {
      success: true,
      data: {
        userId,
        items: [],
        total: 0,
        lastUpdated: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        isExpired: false,
      },
    };
  },

  // Add item to cart
  async addToCart(userId, bookId, title, price, quantity = 1) {
    await delay();
    try {
      const cart = cartMocks.addItemToCart(userId, bookId, title, price, quantity);
      return {
        success: true,
        data: {
          ...cart,
          total: cartMocks.getCartTotal(cart),
        },
      };
    } catch (error) {
      return { success: false, error: 'Error al agregar al carrito' };
    }
  },

  // Remove item from cart
  async removeFromCart(userId, bookId) {
    await delay();
    try {
      const cart = cartMocks.removeItemFromCart(userId, bookId);
      if (cart) {
        return {
          success: true,
          data: {
            ...cart,
            total: cartMocks.getCartTotal(cart),
          },
        };
      }
      return { success: false, error: 'Carrito no encontrado' };
    } catch (error) {
      return { success: false, error: 'Error al eliminar del carrito' };
    }
  },

  // Update item quantity
  async updateItemQuantity(userId, bookId, quantity) {
    await delay();
    try {
      const cart = cartMocks.updateCartItemQuantity(userId, bookId, quantity);
      if (cart) {
        return {
          success: true,
          data: {
            ...cart,
            total: cartMocks.getCartTotal(cart),
          },
        };
      }
      return { success: false, error: 'Carrito no encontrado' };
    } catch (error) {
      return { success: false, error: 'Error al actualizar cantidad' };
    }
  },

  // Clear cart
  async clearCart(userId) {
    await delay();
    try {
      const cart = cartMocks.clearCart(userId);
      if (cart) {
        return {
          success: true,
          data: {
            ...cart,
            total: 0,
          },
        };
      }
      return { success: false, error: 'Carrito no encontrado' };
    } catch (error) {
      return { success: false, error: 'Error al vaciar carrito' };
    }
  },

  // Calculate total
  async getCartTotal(userId) {
    await delay();
    const cart = cartMocks.getCartByUserId(userId);
    if (cart) {
      return { success: true, data: cartMocks.getCartTotal(cart) };
    }
    return { success: true, data: 0 };
  },
};

