# 📚 BookStore Frontend

Un frontend moderno y completo de una librería online construido con React, React Router y Context API.

## 🎯 Características

### Para Clientes
- **📘 Catálogo de Libros**: Busca y filtra libros por género, título o autor
- **🛒 Carrito de Compras**: Agrega libros, modifica cantidades y completa compras
- **⭐ Sistema de Reseñas**: Lee y crea reseñas de libros
- **📦 Historial de Pedidos**: Consulta tus compras anteriores
- **📝 Solicitud de Libros**: Pide que agreguen libros al catálogo

### Para Administradores
- **📚 Gestión de Inventario**: CRUD completo de libros
- **📊 Dashboard**: Ventas por género, libros más vendidos, ingresos totales
- **📦 Gestión de Pedidos**: Visualiza y marca pedidos como completados
- **🎯 Gestión de Promociones**: Crea descuentos con restricciones flexibles
- **📈 Reportes de Ventas**: Filtra por rango de fechas y exporta a CSV
- **💌 Solicitudes de Libros**: Procesa solicitudes de clientes

## 🛠️ Stack Tecnológico

- **React 18+**: Componentes funcionales y hooks
- **React Router v7**: Navegación SPA
- **Context API**: Gestión de estado (autenticación, carrito)
- **Axios**: Cliente HTTP
- **Recharts**: Gráficos (ventas por género, libros más vendidos)
- **CSS Modules**: Estilos desacoplados y variables CSS
- **Vite**: Herramienta de construcción rápida
- **Mocks Locales**: Datos desacoplados para migración futura a backend real

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/                 # Autenticación
│   │   ├── Login.jsx
│   │   └── ProtectedRoute.jsx
│   ├── common/               # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── LoadingSpinner.jsx
│   ├── client/               # Componentes del cliente
│   │   ├── books/            # Catálogo y detalles
│   │   ├── cart/             # Carrito de compras
│   │   ├── orders/           # Historial de pedidos
│   │   └── requests/         # Solicitud de libros
│   └── admin/                # Componentes del administrador
│       ├── dashboard/        # Dashboard con gráficos
│       ├── inventory/        # Gestión de libros
│       ├── orders/           # Gestión de pedidos
│       ├── promotions/       # Gestión de promociones
│       ├── reports/          # Reportes de ventas
│       └── requests/         # Solicitudes de libros
├── context/                  # Context API
│   ├── AuthContext.jsx       # Autenticación global
│   └── CartContext.jsx       # Carrito global
├── services/                 # Servicios intermedios (mocks → backend)
│   ├── auth/
│   ├── book/
│   ├── cart/
│   ├── order/
│   ├── review/
│   ├── promotion/
│   ├── report/
│   └── bookRequest/
├── mocks/                    # Datos mock (fáciles de reemplazar)
│   ├── booksData.js
│   ├── usersData.js
│   ├── cartData.js
│   ├── ordersData.js
│   ├── reviewsData.js
│   ├── promotionsData.js
│   ├── bookRequestsData.js
│   └── reportsData.js
├── hooks/                    # Custom hooks
│   └── useAuth.js
├── utils/                    # Funciones auxiliares
│   ├── constants.js
│   ├── validators.js
│   └── formatters.js
├── styles/                   # Estilos globales
│   ├── variables.css
│   └── App.module.css
├── pages/                    # Páginas principales
│   ├── LoginPage.jsx
│   ├── ClientDashboard.jsx
│   ├── AdminDashboard.jsx
│   └── NotFoundPage.jsx
├── App.jsx                   # Configuración de rutas
└── main.jsx                  # Entry point
```

## 🚀 Instalación y Uso

### Requisitos
- Node.js 16+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio (si aplica)
git clone <repo-url>
cd bookstore

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Ejecutar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para Producción

```bash
# Compilar para producción
npm run build

# Preview de la build
npm run preview
```

## 🔐 Credenciales de Prueba

### Administrador
- **Email**: `admin@bookstore.com`
- **Contraseña**: `admin123`

### Cliente
- **Email**: `cliente@bookstore.com`
- **Contraseña**: `cliente123`

## 📋 Características Principales

### Autenticación
- Login con validación de formulario
- Tokens simulados almacenados en localStorage
- Rutas protegidas por rol
- Contexto global de autenticación

### Carrito de Compras
- Agregar/eliminar items
- Actualizar cantidades
- Ver fecha de expiración
- Persistencia en localStorage
- Total calculado automáticamente

### Libros
- Búsqueda por título o autor
- Filtrado por género
- Paginación (12 items por página)
- Rating y disponibilidad de stock
- Detalle completo con reseñas

### Reseñas
- Crear, editar y eliminar reseñas propias
- Calificación del 1 al 5
- Validación de contenido
- Promedio de calificaciones por libro

### Dashboard Admin
- Gráficos de ventas por género (pie chart)
- Gráficos de libros más vendidos (bar chart)
- Métricas: ingresos totales, órdenes, promedio
- Datos del mes actual

### Reportes
- Filtrado por rango de fechas
- Exportación a CSV
- Detalle de ventas por período
- Métricas: total, promedio, cantidad de órdenes

### Gestión de Promociones
- Crear/editar/eliminar promociones
- Descuento en porcentaje
- Fechas de vigencia
- Restricción de compra mínima
- Restricción de máximo de libros
- Selección múltiple de libros aplicables

## 🔄 Integración con Backend Real

Los servicios intermedios en `/src/services` están diseñados para facilitar la migración a un backend real. Solo necesitas:

1. **Reemplazar las funciones de mocks** en `src/mocks/` con llamadas a la API real
2. **Actualizar los servicios** en `src/services/` para usar `axios` en lugar de funciones locales
3. **Ejemplo de cambio**:

```javascript
// Antes (con mocks)
export const bookService = {
  async getAllBooks() {
    const data = booksData; // De mocks
    return { success: true, data };
  }
};

// Después (con backend)
export const bookService = {
  async getAllBooks() {
    const response = await axiosInstance.get('/books');
    return { success: true, data: response.data };
  }
};
```

## 🎨 Personalización

### Variables de Estilo
Edita `src/styles/variables.css` para cambiar:
- Colores primarios, secundarios, acentos
- Espaciado y tamaños
- Sombras y bordes
- Transiciones

### Validaciones
Modifica `src/utils/validators.js` para añadir o cambiar reglas de validación

### Constantes
Actualiza `src/utils/constants.js` para cambiar roles, endpoints, mensajes, etc.

## 📦 Dependencias Principales

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^7.13.0",
  "axios": "^1.13.5",
  "recharts": "^3.7.0"
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-feature`)
3. Commit tus cambios (`git commit -m 'Añade nueva feature'`)
4. Push a la rama (`git push origin feature/nueva-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## 👤 Autor

BookStore Frontend - 2024

## 📞 Soporte

Para reportar bugs o solicitar features, abre un issue en el repositorio.

---

**Nota**: Este proyecto usa datos mock locales. Para usar datos reales del backend, reemplaza las funciones en `src/services/` con llamadas a la API real.

