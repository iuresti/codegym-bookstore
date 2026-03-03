import * as ordersMocks from '../../mocks/ordersData';
import axiosInstance from '../api/axiosInstance';

const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const orderService = {
  // Create order/sale
  async createOrder(userId, userName, items, total) {
    await delay();
    try {
      const order = ordersMocks.createOrder(userId, userName, items, total);
      return { success: true, data: order };
    } catch (error) {
      return { success: false, error: 'Error al crear la venta' };
    }
  },

  // Get order by ID
  async getOrderById(id) {
    await delay();
    const order = ordersMocks.getOrderById(id);
    if (order) {
      return { success: true, data: order };
    }
    return { success: false, error: 'Pedido no encontrado' };
  },

  // Get orders for a user
  async getOrdersByUserId(userId) {
    await delay();
    const orders = ordersMocks.getOrdersByUserId(userId);
    return {
      success: true,
      data: orders,
      count: orders.length,
    };
  },

  // Get all orders (Admin)
  async getAllOrders() {
    const response = await axiosInstance.get('/orders');
    const orders = Array.isArray(response.data)
            ? response.data
            : response.data?.data ?? [];

    return {
      success: true,
      data: orders,
      count: orders.length,
    };
  },

  // Update order status (Admin)
  async updateOrderStatus(orderId, status) {
    await delay();
    try {
      const order = ordersMocks.updateOrderStatus(orderId, status);
      if (order) {
        return { success: true, data: order };
      }
      return { success: false, error: 'Pedido no encontrado' };
    } catch (error) {
      return { success: false, error: 'Error al actualizar el pedido' };
    }
  },

  // Get sales by date range
  async getSalesByDateRange(startDate, endDate) {
    await delay();
    const sales = ordersMocks.getSalesByDateRange(startDate, endDate);
    return {
      success: true,
      data: sales,
      count: sales.length,
      total: ordersMocks.getTotalSalesByDateRange(startDate, endDate),
    };
  },
};

