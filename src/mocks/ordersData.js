// Mock data for orders/sales
export const ordersData = [];

// Initialize with some sample orders
if (ordersData.length === 0) {
  ordersData.push(
    {
      id: 1,
      userId: 2,
      userName: 'Juan Cliente',
      items: [
        { bookId: 1, title: 'El Quijote', price: 24.99, quantity: 1 },
      ],
      total: 24.99,
      status: 'completado',
      orderDate: new Date('2024-01-10'),
      completedDate: new Date('2024-01-11'),
    },
    {
      id: 2,
      userId: 3,
      userName: 'María García',
      items: [
        { bookId: 2, title: 'Cien años de soledad', price: 18.99, quantity: 1 },
        { bookId: 8, title: '1984', price: 15.99, quantity: 1 },
      ],
      total: 34.98,
      status: 'completado',
      orderDate: new Date('2024-01-15'),
      completedDate: new Date('2024-01-16'),
    },
    {
      id: 3,
      userId: 2,
      userName: 'Juan Cliente',
      items: [
        { bookId: 5, title: 'El Príncipe', price: 12.99, quantity: 2 },
      ],
      total: 25.98,
      status: 'pendiente',
      orderDate: new Date('2024-02-05'),
      completedDate: null,
    }
  );
}

// Helper functions for order operations
export const createOrder = (userId, userName, items, total) => {
  const id = Math.max(...ordersData.map(o => o.id), 0) + 1;
  const order = {
    id,
    userId,
    userName,
    items,
    total,
    status: 'pendiente',
    orderDate: new Date(),
    completedDate: null,
  };
  ordersData.push(order);
  return order;
};

export const getOrderById = (id) => {
  return ordersData.find(o => o.id === parseInt(id));
};

export const getOrdersByUserId = (userId) => {
  return ordersData.filter(o => o.userId === parseInt(userId));
};

export const getAllOrders = () => {
  return ordersData;
};

export const updateOrderStatus = (orderId, status) => {
  const order = getOrderById(orderId);
  if (order) {
    order.status = status;
    if (status === 'completado') {
      order.completedDate = new Date();
    }
  }
  return order;
};

export const getSalesByDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  return ordersData.filter(order => {
    const orderDate = new Date(order.orderDate);
    return orderDate >= start && orderDate <= end && order.status === 'completado';
  });
};

export const getSalesByGenre = (genre) => {
  // This would require matching books with their genres
  // For now, we'll return total sales data grouped by genre
  const salesByGenre = {};
  ordersData.forEach(order => {
    if (order.status === 'completado') {
      order.items.forEach(item => {
        // Genre will be matched from book data
        if (!salesByGenre[genre]) {
          salesByGenre[genre] = { total: 0, quantity: 0 };
        }
        salesByGenre[genre].total += item.price * item.quantity;
        salesByGenre[genre].quantity += item.quantity;
      });
    }
  });
  return salesByGenre;
};

export const getTotalSalesByDateRange = (startDate, endDate) => {
  const sales = getSalesByDateRange(startDate, endDate);
  return sales.reduce((total, order) => total + order.total, 0);
};

