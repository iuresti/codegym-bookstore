// Constants
export const ROLES = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
};

export const ORDER_STATUS = {
  PENDING: 'pendiente',
  COMPLETED: 'completado',
  CANCELLED: 'cancelado',
};

export const REQUEST_STATUS = {
  PENDING: 'pendiente',
  PROCESSED: 'procesado',
  COMPLETED: 'completado',
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    VERIFY: '/auth/verify',
  },
  BOOKS: {
    LIST: '/books',
    GET: '/books/:id',
    CREATE: '/books',
    UPDATE: '/books/:id',
    DELETE: '/books/:id',
    SEARCH: '/books/search',
    GENRES: '/books/genres',
  },
  CART: {
    GET: '/cart/:id',
    UPDATE: '/cart/:id',
    ADD_ITEM: '/cart/:id/items',
    REMOVE_ITEM: '/cart/:id/items/:bookId',
    CLEAR: '/cart/:id/clear',
  },
  ORDERS: {
    CREATE: '/orders',
    GET: '/orders/:id',
    LIST: '/orders',
    UPDATE: '/orders/:id',
    USER_ORDERS: '/orders/user/:userId',
  },
  REVIEWS: {
    CREATE: '/books/:bookId/reviews',
    GET: '/books/:bookId/reviews/:id',
    LIST: '/books/:bookId/reviews',
    UPDATE: '/books/:bookId/reviews/:id',
    DELETE: '/books/:bookId/reviews/:id',
  },
  PROMOTIONS: {
    LIST: '/promotions',
    GET: '/promotions/:id',
    CREATE: '/promotions',
    UPDATE: '/promotions/:id',
    DELETE: '/promotions/:id',
    ACTIVE: '/promotions/active',
  },
  REPORTS: {
    SALES: '/reports/sales',
    BY_DATE: '/reports/sales/date-range',
    BY_GENRE: '/reports/sales/genre',
    TOP_BOOKS: '/reports/top-books',
  },
  BOOK_REQUESTS: {
    CREATE: '/book-requests',
    LIST: '/book-requests',
    GET: '/book-requests/:id',
    UPDATE: '/book-requests/:id',
    DELETE: '/book-requests/:id',
  },
};

export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Sesión iniciada correctamente',
    LOGOUT: 'Sesión cerrada correctamente',
    ADD_TO_CART: 'Libro agregado al carrito',
    REMOVE_FROM_CART: 'Libro eliminado del carrito',
    CLEAR_CART: 'Carrito vaciado',
    CREATE_REVIEW: 'Reseña creada correctamente',
    UPDATE_REVIEW: 'Reseña actualizada correctamente',
    DELETE_REVIEW: 'Reseña eliminada correctamente',
    CREATE_ORDER: 'Pedido creado correctamente',
    UPDATE_ORDER: 'Pedido actualizado correctamente',
  },
  ERROR: {
    LOGIN_FAILED: 'Error al iniciar sesión',
    LOGOUT_FAILED: 'Error al cerrar sesión',
    NETWORK_ERROR: 'Error de conexión',
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    BOOK_NOT_FOUND: 'Libro no encontrado',
    INSUFFICIENT_STOCK: 'Stock insuficiente',
  },
};

// Pagination defaults
export const PAGINATION = {
  PAGE_SIZE: 10,
  MAX_ITEMS: 100,
};

// Validation rules
export const VALIDATION = {
  EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  REVIEW_MIN_LENGTH: 10,
  REVIEW_MAX_LENGTH: 1000,
  MIN_RATING: 1,
  MAX_RATING: 5,
};

