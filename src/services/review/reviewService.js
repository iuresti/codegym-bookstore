import * as reviewsMocks from '../../mocks/reviewsData';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const reviewService = {
  // Get reviews for a book
  async getReviewsByBookId(bookId) {
    await delay();
    const reviews = reviewsMocks.getReviewsByBookId(bookId);
    return {
      success: true,
      data: reviews,
      count: reviews.length,
      averageRating: reviewsMocks.getAverageRatingByBookId(bookId),
    };
  },

  // Get review by ID
  async getReviewById(bookId, reviewId) {
    await delay();
    const review = reviewsMocks.getReviewById(bookId, reviewId);
    if (review) {
      return { success: true, data: review };
    }
    return { success: false, error: 'Reseña no encontrada' };
  },

  // Create review
  async createReview(bookId, userId, userName, rating, title, comment) {
    await delay();
    try {
      const review = reviewsMocks.addReview(bookId, userId, userName, rating, title, comment);
      return { success: true, data: review };
    } catch (error) {
      return { success: false, error: 'Error al crear la reseña' };
    }
  },

  // Update review
  async updateReview(bookId, reviewId, rating, title, comment) {
    await delay();
    try {
      const review = reviewsMocks.updateReview(bookId, reviewId, rating, title, comment);
      if (review) {
        return { success: true, data: review };
      }
      return { success: false, error: 'Reseña no encontrada' };
    } catch (error) {
      return { success: false, error: 'Error al actualizar la reseña' };
    }
  },

  // Delete review
  async deleteReview(bookId, reviewId) {
    await delay();
    try {
      const result = reviewsMocks.deleteReview(bookId, reviewId);
      if (result) {
        return { success: true, message: 'Reseña eliminada correctamente' };
      }
      return { success: false, error: 'Reseña no encontrada' };
    } catch (error) {
      return { success: false, error: 'Error al eliminar la reseña' };
    }
  },

  // Get average rating for book
  async getAverageRating(bookId) {
    await delay();
    const averageRating = reviewsMocks.getAverageRatingByBookId(bookId);
    return { success: true, data: parseFloat(averageRating) };
  },
};

