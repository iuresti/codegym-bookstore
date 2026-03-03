import * as booksService from '../../mocks/booksData';
import axiosInstance from '../api/axiosInstance';


export const bookService = {
  // Get all books
  async getAllBooks() {
    try {
      const response = await axiosInstance.get('/books');
      const books = Array.isArray(response.data)
        ? response.data
        : response.data?.data ?? [];

      return {
        success: true,
        data: books,
        count: books.length,
      };
    } catch (error) {
      return { success: false, error: 'Error al obtener libros', data: [] };
    }
  },

  // Get book by ID
  async getBookById(id) {
    const book = booksService.getBookById(id);
    if (book) {
      return { success: true, data: book };
    }
    return { success: false, error: 'Libro no encontrado', data: null };
  },

  // Search books
  async searchBooks(query) {
    const normalizedQuery = (query ?? '').toString().trim().toLowerCase();

    try {
      const response = await axiosInstance.get('/books');
      const books = Array.isArray(response.data)
        ? response.data
        : response.data?.data ?? [];

      const results = normalizedQuery
        ? books.filter((book) => {
            const title = (book.title ?? '').toString().toLowerCase();
            const author = (book.author ?? '').toString().toLowerCase();
            const genre = (book.genre ?? '').toString().toLowerCase();
            return (
              title.includes(normalizedQuery) ||
              author.includes(normalizedQuery) ||
              genre.includes(normalizedQuery)
            );
          })
        : books;

      return {
        success: true,
        data: results,
        count: results.length,
      };
    } catch (error) {
      const results = booksService.searchBooks(query ?? '');
      return {
        success: true,
        data: results,
        count: results.length,
      };
    }
  },

  // Get books by genre
  async getBooksByGenre(genre) {
    const results = booksService.getBooksByGenre(genre);
    return {
      success: true,
      data: results,
      count: results.length,
    };
  },

  // Get top rated books
  async getTopBooks(limit = 5) {
    const results = booksService.getTopBooks(limit);
    return {
      success: true,
      data: results,
      count: results.length,
    };
  },

  // Create book (Admin)
  async createBook(bookData) {
    try {
      const response = await axiosInstance.post('/books', bookData);
      const newBook = response.data;
      return { success: true, data: newBook };
    } catch (error) {
      return { success: false, error: 'Error al crear el libro' };
    }
  },

  // Update book (Admin)
  async updateBook(id, bookData) {
    try {
      const response = await axiosInstance.put(`/books/${id}`, bookData);
      const updatedBook = response.data;
      return { success: true, data: updatedBook };
    } catch (error) {
      return { success: false, error: 'Error al actualizar el libro' };
    }
  },

  // Delete book (Admin)
  async deleteBook(id) {
    try {
      await axiosInstance.delete(`/books/${id}`);
      return { success: true, message: 'Libro eliminado correctamente' };
    } catch (error) {
      return { success: false, error: 'Error al eliminar el libro' };
    }
  },

  // Get available genres
  async getGenres() {
    const genres = [...new Set(booksService.booksData.map(book => book.genre))];
    return { success: true, data: genres };
  },
};
