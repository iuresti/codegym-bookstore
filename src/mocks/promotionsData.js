// Mock data for book promotions
export const promotionsData = [
  {
    id: 1,
    name: 'Enero en Descuento',
    description: '15% de descuento en libros seleccionados',
    discountPercentage: 15,
    bookIds: [1, 2, 3],
    minPurchaseAmount: 20,
    maxBooks: 5,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    active: false,
  },
  {
    id: 2,
    name: 'Febrero Flash Sale',
    description: '20% de descuento en novelas de ficción',
    discountPercentage: 20,
    bookIds: [7, 8, 12, 14],
    minPurchaseAmount: 30,
    maxBooks: 3,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-14'),
    active: true,
  },
  {
    id: 3,
    name: 'Promoción Primavera',
    description: '10% en libros de romance',
    discountPercentage: 10,
    bookIds: [6, 9, 18],
    minPurchaseAmount: 15,
    maxBooks: 10,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-05-31'),
    active: false,
  },
];

// Helper functions for promotion operations
export const getActivePromotions = () => {
  const now = new Date();
  return promotionsData.filter(p => {
    const startDate = new Date(p.startDate);
    const endDate = new Date(p.endDate);
    return now >= startDate && now <= endDate;
  });
};

export const getPromotionById = (id) => {
  return promotionsData.find(p => p.id === parseInt(id));
};

export const getPromotionByBookId = (bookId) => {
  return getActivePromotions().find(p => p.bookIds.includes(bookId));
};

export const getAllPromotions = () => {
  return promotionsData;
};

export const addPromotion = (promotion) => {
  const id = Math.max(...promotionsData.map(p => p.id), 0) + 1;
  const newPromotion = {
    ...promotion,
    id,
    startDate: new Date(promotion.startDate),
    endDate: new Date(promotion.endDate),
    active: false,
  };
  promotionsData.push(newPromotion);
  return newPromotion;
};

export const updatePromotion = (id, promotionData) => {
  const promotion = getPromotionById(id);
  if (promotion) {
    Object.assign(promotion, {
      ...promotionData,
      startDate: new Date(promotionData.startDate),
      endDate: new Date(promotionData.endDate),
    });
  }
  return promotion;
};

export const deletePromotion = (id) => {
  const index = promotionsData.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    promotionsData.splice(index, 1);
    return true;
  }
  return false;
};

export const validatePromotion = (promotion, cartItems) => {
  // Validate minimum purchase amount
  if (promotion.minPurchaseAmount) {
    const itemsInPromo = cartItems.filter(item => promotion.bookIds.includes(item.bookId));
    const totalAmount = itemsInPromo.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (totalAmount < promotion.minPurchaseAmount) {
      return false;
    }
  }

  // Validate max books in promotion
  if (promotion.maxBooks) {
    const itemsInPromo = cartItems.filter(item => promotion.bookIds.includes(item.bookId));
    const totalBooks = itemsInPromo.reduce((sum, item) => sum + item.quantity, 0);
    if (totalBooks > promotion.maxBooks) {
      return false;
    }
  }

  return true;
};

