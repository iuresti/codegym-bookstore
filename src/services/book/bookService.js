import * as booksService from '../../mocks/booksData';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const bookService = {
  // Get all books
  async getAllBooks() {
    await delay();
    return {
      success: true,
      data: booksService.booksData,
      count: booksService.booksData.length,
    };
  },

  // Get book by ID
  async getBookById(id) {
    await delay();
    const book = booksService.getBookById(id);
    if (book) {
      return { success: true, data: book };
    }
    return { success: false, error: 'Libro no encontrado', data: null };
  },

  // Search books
  async searchBooks(query) {
    await delay();
    const results = booksService.searchBooks(query);
    return {
      success: true,
      data: results,
      count: results.length,
    };
  },

  // Get books by genre
  async getBooksByGenre(genre) {
    await delay();
    const results = booksService.getBooksByGenre(genre);
    return {
      success: true,
      data: results,
      count: results.length,
    };
  },

  // Get top rated books
  async getTopBooks(limit = 5) {
    await delay();
    const results = booksService.getTopBooks(limit);
    return {
      success: true,
      data: results,
      count: results.length,
    };
  },

  // Create book (Admin)
  async createBook(bookData) {
    await delay();
    try {
      const newBook = booksService.addBook(bookData);
      return { success: true, data: newBook };
    } catch (error) {
      return { success: false, error: 'Error al crear el libro' };
    }
  },

  // Update book (Admin)
  async updateBook(id, bookData) {
    await delay();
    try {
      const updatedBook = booksService.updateBook(id, bookData);
      if (updatedBook) {
        return { success: true, data: updatedBook };
      }
      return { success: false, error: 'Libro no encontrado' };
    } catch (error) {
      return { success: false, error: 'Error al actualizar el libro' };
    }
  },

  // Delete book (Admin)
  async deleteBook(id) {
    await delay();
    try {
      const result = booksService.deleteBook(id);
      if (result) {
        return { success: true, message: 'Libro eliminado correctamente' };
      }
      return { success: false, error: 'Libro no encontrado' };
    } catch (error) {
      return { success: false, error: 'Error al eliminar el libro' };
    }
  },

  // Get available genres
  async getGenres() {
    await delay();
    const genres = [...new Set(booksService.booksData.map(book => book.genre))];
    return { success: true, data: genres };
  },
};

