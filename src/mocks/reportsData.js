// Mock data for sales reports
export const reportsData = {
  currentMonth: new Date().getMonth() + 1,
  currentYear: new Date().getFullYear(),

  // Sales by genre for current month
  salesByGenre: [
    { genre: 'Novela', sales: 1850.50, quantity: 45 },
    { genre: 'Realismo Mágico', sales: 950.75, quantity: 28 },
    { genre: 'Misterio', sales: 680.30, quantity: 20 },
    { genre: 'Fantasía', sales: 1200.00, quantity: 35 },
    { genre: 'Ficción', sales: 540.20, quantity: 18 },
    { genre: 'Drama', sales: 780.50, quantity: 22 },
    { genre: 'Romance', sales: 620.40, quantity: 19 },
    { genre: 'Distopía', sales: 870.30, quantity: 25 },
  ],

  // Top selling books for current month
  topBooks: [
    { bookId: 1, title: 'El Quijote', author: 'Miguel de Cervantes', sales: 15, revenue: 374.85 },
    { bookId: 2, title: 'Cien años de soledad', author: 'Gabriel García Márquez', sales: 12, revenue: 227.88 },
    { bookId: 8, title: '1984', author: 'George Orwell', sales: 18, revenue: 287.82 },
    { bookId: 11, title: 'El Hobbit', author: 'J.R.R. Tolkien', sales: 16, revenue: 287.84 },
    { bookId: 15, title: 'La Sombra del Viento', author: 'Carlos Ruiz Zafón', sales: 14, revenue: 265.86 },
  ],
};

// Helper functions for report operations
export const getSalesReportByDateRange = (startDate, endDate) => {
  // In a real app, this would calculate from actual orders
  // For now, return mock data for the current month
  return {
    startDate,
    endDate,
    totalSales: 7472.95,
    totalOrders: 212,
    totalQuantity: 212,
    averageOrderValue: 35.25,
    salesByGenre: reportsData.salesByGenre,
    topBooks: reportsData.topBooks,
  };
};

export const getSalesReportCurrentMonth = () => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  return getSalesReportByDateRange(startDate, endDate);
};

export const getTopBooksByMonth = (limit = 5) => {
  return reportsData.topBooks.slice(0, limit);
};

export const getSalesByGenreCurrentMonth = () => {
  return reportsData.salesByGenre;
};

export const getTotalRevenueCurrentMonth = () => {
  return reportsData.salesByGenre.reduce((total, item) => total + item.sales, 0);
};

