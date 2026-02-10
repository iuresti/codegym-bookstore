// Mock data for users
export const usersData = [
  {
    id: 1,
    email: 'admin@bookstore.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'ADMIN',
    phone: '+34 666 777 888',
    address: 'Calle Admin 123, Madrid',
  },
  {
    id: 2,
    email: 'cliente@bookstore.com',
    password: 'cliente123',
    name: 'Juan Cliente',
    role: 'CLIENT',
    phone: '+34 611 222 333',
    address: 'Calle Cliente 456, Barcelona',
  },
  {
    id: 3,
    email: 'maria@bookstore.com',
    password: 'maria123',
    name: 'María García',
    role: 'CLIENT',
    phone: '+34 612 333 444',
    address: 'Avenida María 789, Valencia',
  },
];

// Helper function for user authentication
export const authenticateUser = (email, password) => {
  const user = usersData.find(u => u.email === email && u.password === password);
  if (user) {
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, token: `token_${user.id}_${Date.now()}` };
  }
  return null;
};

export const getUserById = (id) => {
  const user = usersData.find(u => u.id === parseInt(id));
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

export const getUserByEmail = (email) => {
  const user = usersData.find(u => u.email === email);
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
};

