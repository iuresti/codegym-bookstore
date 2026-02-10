import * as reportsMocks from '../../mocks/reportsData';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const reportService = {
  // Get sales report by date range
  async getSalesReportByDateRange(startDate, endDate) {
    await delay();
    try {
      const report = reportsMocks.getSalesReportByDateRange(startDate, endDate);
      return { success: true, data: report };
    } catch (error) {
      return { success: false, error: 'Error al obtener el reporte' };
    }
  },

  // Get current month report
  async getSalesReportCurrentMonth() {
    await delay();
    try {
      const report = reportsMocks.getSalesReportCurrentMonth();
      return { success: true, data: report };
    } catch (error) {
      return { success: false, error: 'Error al obtener el reporte' };
    }
  },

  // Get top books for current month
  async getTopBooksByMonth(limit = 5) {
    await delay();
    try {
      const books = reportsMocks.getTopBooksByMonth(limit);
      return { success: true, data: books };
    } catch (error) {
      return { success: false, error: 'Error al obtener los libros más vendidos' };
    }
  },

  // Get sales by genre for current month
  async getSalesByGenreCurrentMonth() {
    await delay();
    try {
      const salesByGenre = reportsMocks.getSalesByGenreCurrentMonth();
      return { success: true, data: salesByGenre };
    } catch (error) {
      return { success: false, error: 'Error al obtener ventas por género' };
    }
  },

  // Get total revenue for current month
  async getTotalRevenueCurrentMonth() {
    await delay();
    try {
      const revenue = reportsMocks.getTotalRevenueCurrentMonth();
      return { success: true, data: revenue };
    } catch (error) {
      return { success: false, error: 'Error al obtener ingresos totales' };
    }
  },
};

