// Mock data for book requests
export const bookRequestsData = [];

// Initialize with some sample requests
if (bookRequestsData.length === 0) {
  bookRequestsData.push(
    {
      id: 1,
      userId: 2,
      userName: 'Juan Cliente',
      bookTitle: 'Dune',
      author: 'Frank Herbert',
      genre: 'Ciencia Ficción',
      requestDate: new Date('2024-01-20'),
      status: 'pendiente',
    },
    {
      id: 2,
      userId: 3,
      userName: 'María García',
      bookTitle: 'Fundación',
      author: 'Isaac Asimov',
      genre: 'Ciencia Ficción',
      requestDate: new Date('2024-02-01'),
      status: 'procesado',
    }
  );
}

// Helper functions for book request operations
export const createBookRequest = (userId, userName, bookTitle, author, genre) => {
  const id = Math.max(...bookRequestsData.map(r => r.id), 0) + 1;
  const request = {
    id,
    userId,
    userName,
    bookTitle,
    author,
    genre,
    requestDate: new Date(),
    status: 'pendiente',
  };
  bookRequestsData.push(request);
  return request;
};

export const getBookRequestById = (id) => {
  return bookRequestsData.find(r => r.id === parseInt(id));
};

export const getBookRequestsByUserId = (userId) => {
  return bookRequestsData.filter(r => r.userId === parseInt(userId));
};

export const getAllBookRequests = () => {
  return bookRequestsData;
};

export const updateBookRequestStatus = (id, status) => {
  const request = getBookRequestById(id);
  if (request) {
    request.status = status;
  }
  return request;
};

export const deleteBookRequest = (id) => {
  const index = bookRequestsData.findIndex(r => r.id === parseInt(id));
  if (index !== -1) {
    bookRequestsData.splice(index, 1);
    return true;
  }
  return false;
};

