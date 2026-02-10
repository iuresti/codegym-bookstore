// Mock data for shopping carts
export const cartsData = {
  1: {
    id: 1,
    userId: 2,
    items: [],
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
  },
  2: {
    id: 2,
    userId: 3,
    items: [
      { bookId: 1, title: 'El Quijote', price: 24.99, quantity: 1 },
      { bookId: 8, title: '1984', price: 15.99, quantity: 2 },
    ],
    lastUpdated: new Date(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
};

// Helper functions for cart operations
export const getCartByUserId = (userId) => {
  return Object.values(cartsData).find(cart => cart.userId === parseInt(userId));
};

export const addItemToCart = (userId, bookId, title, price, quantity = 1) => {
  const cartId = Object.keys(cartsData).length + 1;
  let cart = Object.values(cartsData).find(c => c.userId === parseInt(userId));

  if (!cart) {
    cart = {
      id: cartId,
      userId: parseInt(userId),
      items: [],
      lastUpdated: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    cartsData[cartId] = cart;
  }

  const existingItem = cart.items.find(item => item.bookId === bookId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ bookId, title, price, quantity });
  }

  cart.lastUpdated = new Date();
  return cart;
};

export const removeItemFromCart = (userId, bookId) => {
  const cart = Object.values(cartsData).find(c => c.userId === parseInt(userId));
  if (cart) {
    cart.items = cart.items.filter(item => item.bookId !== bookId);
    cart.lastUpdated = new Date();
  }
  return cart;
};

export const updateCartItemQuantity = (userId, bookId, quantity) => {
  const cart = Object.values(cartsData).find(c => c.userId === parseInt(userId));
  if (cart) {
    const item = cart.items.find(i => i.bookId === bookId);
    if (item) {
      if (quantity <= 0) {
        cart.items = cart.items.filter(i => i.bookId !== bookId);
      } else {
        item.quantity = quantity;
      }
      cart.lastUpdated = new Date();
    }
  }
  return cart;
};

export const clearCart = (userId) => {
  const cart = Object.values(cartsData).find(c => c.userId === parseInt(userId));
  if (cart) {
    cart.items = [];
    cart.lastUpdated = new Date();
  }
  return cart;
};

export const getCartTotal = (cart) => {
  return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
};

export const isCartExpired = (cart) => {
  return new Date() > new Date(cart.expiresAt);
};

