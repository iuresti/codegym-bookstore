# 🏗️ Arquitectura Técnica - BookStore Frontend

## 1. Stack Tecnológico Completo

```
┌─────────────────────────────────────────┐
│        Navegador (Cliente)              │
│  HTML5 + CSS3 + JavaScript (ES2022)    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         React 18 (SPA)                  │
│  • Componentes funcionales              │
│  • Hooks (useState, useEffect, etc)     │
│  • Context API para estado global       │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│       React Router v7                   │
│  • Navegación sin refresco              │
│  • Rutas protegidas por rol             │
│  • Parámetros dinámicos                 │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    Context API + Custom Hooks           │
│  • AuthContext (usuario, rol, login)    │
│  • CartContext (items, total)           │
│  • useAuth, useCart, useUser            │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│       Servicios (Intermediarios)        │
│  • authService.js                       │
│  • bookService.js                       │
│  • cartService.js                       │
│  • orderService.js                      │
│  • reviewService.js                     │
│  • promotionService.js                  │
│  • reportService.js                     │
│  • bookRequestService.js                │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│    Mocks Locales (Base de datos)        │
│  • booksData.js (20 libros)             │
│  • usersData.js (3 usuarios)            │
│  • cartData.js (carritos)               │
│  • ordersData.js (pedidos)              │
│  • reviewsData.js (reseñas)             │
│  • promotionsData.js (promociones)      │
│  • bookRequestsData.js (solicitudes)    │
│  • reportsData.js (estadísticas)        │
└─────────────────────────────────────────┘
```

## 2. Flujo de Datos (Redux-like pattern)

```javascript
// 1. Usuario interactúa con componente
<button onClick={handleAddToCart}>Agregar</button>

// 2. Componente llama función del contexto
const { addToCart } = useCart();
const result = await addToCart(userId, bookId, ...);

// 3. Contexto llama al servicio
// CartContext.jsx
const result = await cartService.addToCart(...);

// 4. Servicio interactúa con mocks/backend
// cartService.js
async addToCart(userId, bookId, ...) {
  const cart = cartMocks.addItemToCart(...); // Mock
  return { success: true, data: cart };
}

// 5. Mock actualiza el estado
// cartData.js
export function addItemToCart(userId, bookId, ...) {
  const cart = cartsData[userId];
  cart.items.push(newItem);
  return cart;
}

// 6. Contexto actualiza estado global
// CartContext.jsx
if (result.success) {
  setCart(result.data); // Actualiza estado
}

// 7. Componentes re-renderizan automáticamente
```

## 3. Estructura de Carpetas Detallada

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx               # Pantalla de login
│   │   └── ProtectedRoute.jsx      # HOC para rutas protegidas
│   │
│   ├── common/
│   │   ├── Header.jsx              # Encabezado con usuario
│   │   ├── Navbar.jsx              # Menú lateral (diferente por rol)
│   │   ├── Footer.jsx              # Pie de página
│   │   └── LoadingSpinner.jsx      # Indicador de carga
│   │
│   ├── client/
│   │   ├── books/
│   │   │   ├── BookList.jsx        # Catálogo con búsqueda/filtros
│   │   │   ├── BookDetail.jsx      # Detalle + reseñas + carrito
│   │   │   └── BookCard.jsx        # Tarjeta de libro (si existe)
│   │   │
│   │   ├── cart/
│   │   │   ├── CartPage.jsx        # Página del carrito
│   │   │   ├── CartItem.jsx        # Fila de item (si existe)
│   │   │   └── CartSummary.jsx     # Resumen (si existe)
│   │   │
│   │   ├── orders/
│   │   │   └── ClientOrders.jsx    # Historial de pedidos
│   │   │
│   │   └── requests/
│   │       └── BookRequestForm.jsx # Solicitar libro
│   │
│   └── admin/
│       ├── dashboard/
│       │   └── Dashboard.jsx       # Dashboard con gráficos
│       │
│       ├── inventory/
│       │   └── InventoryList.jsx   # Tabla CRUD de libros
│       │
│       ├── orders/
│       │   └── AdminOrders.jsx     # Gestión de pedidos
│       │
│       ├── promotions/
│       │   └── PromotionsList.jsx  # CRUD de promociones
│       │
│       ├── reports/
│       │   └── SalesReport.jsx     # Reportes + exportar CSV
│       │
│       └── requests/
│           └── AdminBookRequests.jsx # Procesar solicitudes
│
├── context/
│   ├── AuthContext.jsx             # Autenticación global
│   │   ├── user (objeto con rol)
│   │   ├── login() → backend
│   │   ├── logout()
│   │   └── isAuthenticated()
│   │
│   └── CartContext.jsx             # Carrito global
│       ├── cart (estado)
│       ├── addToCart()
│       ├── removeFromCart()
│       ├── updateItemQuantity()
│       └── clearCart()
│
├── services/
│   ├── api/
│   │   └── axiosInstance.js        # Cliente HTTP configurado
│   │
│   ├── auth/
│   │   └── authService.js
│   │       • login(email, pass)
│   │       • logout()
│   │       • getCurrentUser()
│   │       • validateToken()
│   │
│   ├── book/
│   │   └── bookService.js
│   │       • getAllBooks()
│   │       • getBookById(id)
│   │       • searchBooks(query)
│   │       • getBooksByGenre(genre)
│   │       • createBook(data)
│   │       • updateBook(id, data)
│   │       • deleteBook(id)
│   │
│   ├── cart/
│   │   └── cartService.js
│   │       • getCart(userId)
│   │       • addToCart()
│   │       • removeFromCart()
│   │       • updateItemQuantity()
│   │       • clearCart()
│   │       • getCartTotal()
│   │
│   ├── order/
│   │   └── orderService.js
│   │       • createOrder()
│   │       • getOrderById()
│   │       • getAllOrders()
│   │       • updateOrderStatus()
│   │       • getSalesByDateRange()
│   │
│   ├── review/
│   │   └── reviewService.js
│   │       • getReviewsByBookId()
│   │       • createReview()
│   │       • updateReview()
│   │       • deleteReview()
│   │       • getAverageRating()
│   │
│   ├── promotion/
│   │   └── promotionService.js
│   │       • getActivePromotions()
│   │       • getAllPromotions()
│   │       • createPromotion()
│   │       • updatePromotion()
│   │       • deletePromotion()
│   │       • validatePromotion()
│   │
│   ├── report/
│   │   └── reportService.js
│   │       • getSalesReportByDateRange()
│   │       • getSalesReportCurrentMonth()
│   │       • getTopBooksByMonth()
│   │       • getSalesByGenreCurrentMonth()
│   │
│   └── bookRequest/
│       └── bookRequestService.js
│           • createBookRequest()
│           • getAllBookRequests()
│           • updateBookRequestStatus()
│           • deleteBookRequest()
│
├── mocks/
│   ├── booksData.js                # 20 libros de ejemplo
│   │   • booksData[] (array)
│   │   • getBookById(id)
│   │   • searchBooks(query)
│   │   • addBook(data)
│   │   • updateBook(id, data)
│   │   • deleteBook(id)
│   │
│   ├── usersData.js                # 3 usuarios
│   │   • usersData[]
│   │   • authenticateUser()
│   │   • getUserById()
│   │
│   ├── cartData.js                 # Carritos por usuario
│   │   • cartsData{}
│   │   • getCartByUserId()
│   │   • addItemToCart()
│   │   • clearCart()
│   │
│   ├── ordersData.js               # Pedidos completados
│   │   • ordersData[]
│   │   • createOrder()
│   │   • getOrdersByUserId()
│   │   • updateOrderStatus()
│   │
│   ├── reviewsData.js              # Reseñas por libro
│   │   • reviewsData{}
│   │   • getReviewsByBookId()
│   │   • addReview()
│   │   • updateReview()
│   │   • deleteReview()
│   │
│   ├── promotionsData.js           # Promociones activas
│   │   • promotionsData[]
│   │   • getActivePromotions()
│   │   • addPromotion()
│   │   • validatePromotion()
│   │
│   ├── bookRequestsData.js         # Solicitudes
│   │   • bookRequestsData[]
│   │   • createBookRequest()
│   │   • updateBookRequestStatus()
│   │
│   └── reportsData.js              # Estadísticas
│       • reportsData{}
│       • getSalesReportCurrentMonth()
│       • getTopBooksByMonth()
│
├── hooks/
│   └── useAuth.js
│       • useAuth()      → AuthContext
│       • useCart()      → CartContext
│       • useUser()      → { user, isClient, isAdmin }
│
├── utils/
│   ├── constants.js                # Roles, endpoints, mensajes
│   ├── validators.js              # Validaciones de formularios
│   └── formatters.js              # Formato dinero, fechas, etc
│
├── styles/
│   ├── variables.css              # Temas y variables CSS
│   └── App.module.css             # Componentes CSS
│
├── pages/
│   ├── ClientDashboard.jsx        # Layout cliente
│   ├── AdminDashboard.jsx         # Layout admin
│   └── NotFoundPage.jsx           # 404
│
├── App.jsx                         # Rutas principales
└── main.jsx                        # Entry point
```

## 4. Flujo de Autenticación

```javascript
┌─────────────────────────────────────┐
│  Usuario en Login.jsx               │
│  Ingresa: email + password          │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  handleSubmit()                     │
│  Valida datos                       │
│  Llama: login(email, pass)          │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  AuthContext.login()                │
│  Llama: authService.login()         │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  authService.login()                │
│  Llama: authenticateUser(email)     │
│  de usersData.js (mock)             │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Encontrado usuario:                │
│  {id, email, role, name, token}     │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  localStorage.setItem('authUser')   │
│  localStorage.setItem('authToken')  │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  setUser(user)                      │
│  AuthContext actualiza estado       │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  React re-renderiza componentes     │
│  ProtectedRoute verifica rol        │
│  Redirige a /client o /admin        │
└─────────────────────────────────────┘
```

## 5. Patrón de Componente (Ejemplo: BookList)

```javascript
// 1. Import de dependencias
import { useState, useEffect } from 'react';
import { bookService } from '../services/book/bookService';
import { LoadingSpinner } from './common/LoadingSpinner';
import styles from '../styles/App.module.css';

// 2. Componente funcional
export const BookList = () => {
  // 3. Estados locales
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 4. Efectos (carga de datos)
  useEffect(() => {
    loadBooks();
  }, []);

  // 5. Funciones
  const loadBooks = async () => {
    setLoading(true);
    try {
      const result = await bookService.getAllBooks();
      if (result.success) {
        setBooks(result.data);
      }
    } catch (err) {
      setError('Error al cargar');
    } finally {
      setLoading(false);
    }
  };

  // 6. Renderizado
  if (loading) return <LoadingSpinner />;
  
  return (
    <div>
      <h1>Libros</h1>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.grid}>
        {books.map(book => (
          <div key={book.id} className={styles.card}>
            {/* Contenido */}
          </div>
        ))}
      </div>
    </div>
  );
};
```

## 6. Cambio de Mocks a Backend (Migración)

### Paso 1: Actualizar servicio

```javascript
// services/book/bookService.js - ANTES
async getAllBooks() {
  const result = booksService.booksData;
  return { success: true, data: result };
}

// services/book/bookService.js - DESPUÉS
async getAllBooks() {
  const response = await axiosInstance.get('/books');
  return { success: true, data: response.data };
}
```

### Paso 2: Nada más cambia
- Componentes siguen igual
- Contextos siguen igual
- La interfaz sigue igual

### Paso 3: Configurar .env
```env
VITE_API_URL=https://api.mibackend.com
```

## 7. Validaciones y Seguridad

```javascript
// 1. Validaciones en cliente (utils/validators.js)
const { isValid, errors } = validateLogin(email, password);
if (!isValid) {
  // Mostrar errores específicos
}

// 2. Validaciones de rol (ProtectedRoute.jsx)
if (!isAuthenticated()) return <Navigate to="/login" />;
if (requiredRole && user.role !== requiredRole) {
  return <Navigate to="/" />;
}

// 3. Datos seguros en contexto
// Nunca se pasa password en el estado global

// 4. Token en localStorage
localStorage.setItem('authToken', token);
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

## 8. Performance

- **Code Splitting**: Vite automáticamente
- **Lazy Loading**: React.lazy() para rutas (opcional)
- **Memoización**: React.memo() donde sea necesario
- **Virtual Scrolling**: Implementable en listados largos

## 9. Testing (Recomendaciones)

```javascript
// Usar Jest + React Testing Library
test('LoginForm submits with valid data', () => {
  render(<Login />);
  const emailInput = screen.getByPlaceholderText(/email/i);
  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  // ... más tests
});
```

## 10. Despliegue a Producción

```bash
# Build
npm run build

# Resultado en dist/
# Copiar a servidor

# Opciones:
# 1. Vercel: Deploy directo de Git
# 2. Netlify: Drop folder dist/
# 3. AWS S3 + CloudFront
# 4. Servidor propio: nginx/apache
```

---

**Arquitectura profesional, escalable y lista para producción** ✅

