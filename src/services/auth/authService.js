import { authenticateUser, getUserById, getUserByEmail } from '../../mocks/usersData';

// Simulate API call delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Login - currently using mocks
  async login(email, password) {
    await delay();
    const user = authenticateUser(email, password);
    if (user) {
      localStorage.setItem('authToken', user.token);
      localStorage.setItem('authUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Email o contraseña incorrectos' };
  },

  // Logout
  async logout() {
    await delay(300);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    return { success: true };
  },

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('authUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },

  // Get user by ID (for profile)
  async getUserById(id) {
    await delay();
    const user = getUserById(id);
    if (user) {
      return { success: true, user };
    }
    return { success: false, error: 'Usuario no encontrado' };
  },

  // Get user by email (for verification)
  async getUserByEmail(email) {
    await delay();
    const user = getUserByEmail(email);
    if (user) {
      return { success: true, user };
    }
    return { success: false, error: 'Usuario no encontrado' };
  },

  // Validate token
  async validateToken(token) {
    await delay(200);
    // In a real app, this would validate with backend
    const user = this.getCurrentUser();
    return !!user && user.token === token;
  },
};

