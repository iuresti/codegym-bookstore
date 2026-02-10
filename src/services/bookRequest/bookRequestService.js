import * as bookRequestsMocks from '../../mocks/bookRequestsData';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

export const bookRequestService = {
  // Create book request
  async createBookRequest(userId, userName, bookTitle, author, genre) {
    await delay();
    try {
      const request = bookRequestsMocks.createBookRequest(userId, userName, bookTitle, author, genre);
      return { success: true, data: request };
    } catch (error) {
      return { success: false, error: 'Error al crear la solicitud' };
    }
  },

  // Get book request by ID
  async getBookRequestById(id) {
    await delay();
    const request = bookRequestsMocks.getBookRequestById(id);
    if (request) {
      return { success: true, data: request };
    }
    return { success: false, error: 'Solicitud no encontrada' };
  },

  // Get requests for a user
  async getBookRequestsByUserId(userId) {
    await delay();
    const requests = bookRequestsMocks.getBookRequestsByUserId(userId);
    return {
      success: true,
      data: requests,
      count: requests.length,
    };
  },

  // Get all book requests (Admin)
  async getAllBookRequests() {
    await delay();
    const requests = bookRequestsMocks.getAllBookRequests();
    return {
      success: true,
      data: requests,
      count: requests.length,
    };
  },

  // Update book request status (Admin)
  async updateBookRequestStatus(id, status) {
    await delay();
    try {
      const request = bookRequestsMocks.updateBookRequestStatus(id, status);
      if (request) {
        return { success: true, data: request };
      }
      return { success: false, error: 'Solicitud no encontrada' };
    } catch (error) {
      return { success: false, error: 'Error al actualizar la solicitud' };
    }
  },

  // Delete book request (Admin)
  async deleteBookRequest(id) {
    await delay();
    try {
      const result = bookRequestsMocks.deleteBookRequest(id);
      if (result) {
        return { success: true, message: 'Solicitud eliminada correctamente' };
      }
      return { success: false, error: 'Solicitud no encontrada' };
    } catch (error) {
      return { success: false, error: 'Error al eliminar la solicitud' };
    }
  },
};

