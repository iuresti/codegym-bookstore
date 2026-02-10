import * as promotionsMocks from '../../mocks/promotionsData';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const promotionService = {
  // Get active promotions
  async getActivePromotions() {
    await delay();
    const promotions = promotionsMocks.getActivePromotions();
    return {
      success: true,
      data: promotions,
      count: promotions.length,
    };
  },

  // Get all promotions (Admin)
  async getAllPromotions() {
    await delay();
    const promotions = promotionsMocks.getAllPromotions();
    return {
      success: true,
      data: promotions,
      count: promotions.length,
    };
  },

  // Get promotion by ID
  async getPromotionById(id) {
    await delay();
    const promotion = promotionsMocks.getPromotionById(id);
    if (promotion) {
      return { success: true, data: promotion };
    }
    return { success: false, error: 'Promoción no encontrada' };
  },

  // Get promotion for a book
  async getPromotionByBookId(bookId) {
    await delay();
    const promotion = promotionsMocks.getPromotionByBookId(bookId);
    if (promotion) {
      return { success: true, data: promotion };
    }
    return { success: true, data: null }; // No error if no promotion
  },

  // Create promotion (Admin)
  async createPromotion(promotion) {
    await delay();
    try {
      const newPromotion = promotionsMocks.addPromotion(promotion);
      return { success: true, data: newPromotion };
    } catch (error) {
      return { success: false, error: 'Error al crear la promoción' };
    }
  },

  // Update promotion (Admin)
  async updatePromotion(id, promotion) {
    await delay();
    try {
      const updatedPromotion = promotionsMocks.updatePromotion(id, promotion);
      if (updatedPromotion) {
        return { success: true, data: updatedPromotion };
      }
      return { success: false, error: 'Promoción no encontrada' };
    } catch (error) {
      return { success: false, error: 'Error al actualizar la promoción' };
    }
  },

  // Delete promotion (Admin)
  async deletePromotion(id) {
    await delay();
    try {
      const result = promotionsMocks.deletePromotion(id);
      if (result) {
        return { success: true, message: 'Promoción eliminada correctamente' };
      }
      return { success: false, error: 'Promoción no encontrada' };
    } catch (error) {
      return { success: false, error: 'Error al eliminar la promoción' };
    }
  },

  // Validate promotion (check if applies to cart)
  async validatePromotion(promotionId, cartItems) {
    await delay();
    try {
      const promotion = promotionsMocks.getPromotionById(promotionId);
      if (!promotion) {
        return { success: false, error: 'Promoción no encontrada' };
      }
      const isValid = promotionsMocks.validatePromotion(promotion, cartItems);
      return { success: true, data: { isValid, promotion } };
    } catch (error) {
      return { success: false, error: 'Error al validar la promoción' };
    }
  },
};

