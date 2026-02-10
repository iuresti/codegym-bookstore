# 📚 Bookstore Frontend (React)

## 🎯 Objetivo

Crear el frontend de una **librería online** usando **React**, con soporte para dos tipos de usuarios:

- **Administrador**
- **Cliente**

El frontend debe consumir datos **desde mocks locales**, pero estar diseñado de forma que **los mocks puedan reemplazarse fácilmente por llamadas reales al backend** en el futuro.

---

## Estilo
- Moderno
- Llamativo
- SPA
- Intuitivo

## 🧱 Stack Tecnológico

- React (hooks, functional components)
- React Router
- Context API o Redux Toolkit (para auth, carrito y usuario)
- Fetch API o Axios
- CSS Modules o styled-components
- Mock data desacoplada de los componentes

---

## 🔐 Autenticación

- Pantalla de **Login**
- Roles: `ADMIN`, `CLIENT`
- El rol determina qué rutas y componentes se renderizan
- El estado del usuario autenticado debe almacenarse en contexto global

---

## 👤 Funcionalidades del Cliente

### 📦 Carrito de Compras
- Añadir libros al carrito
- Eliminar libros del carrito
- Vaciar carrito
- Ver fecha de última actualización
- Ver tiempo de expiración del carrito
- Completar compra

### 📘 Libros
- Ver listado de libros
- Ver detalle de un libro
- Calificar libro
- Crear reseña
- Editar reseña
- Eliminar reseña

### 📩 Solicitud de Libros
- Formulario para solicitar libros que no están en catálogo

---

## 🛠️ Funcionalidades del Administrador

### 📚 Inventario
- Crear libro
- Editar libro
- Eliminar libro
- Consultar libros

### 📊 Reportes
- Ver ventas por rango de fechas

### 📦 Pedidos
- Ver pedidos
- Marcar pedidos como completados

### 🎯 Promociones
- Crear promociones con:
    - Fecha inicio
    - Fecha término
    - Libros aplicables
    - Máximo de libros en promoción
    - Mínimo de compra (monto o cantidad)

### 📈 Dashboard
- Ventas por género (mes actual)
- Libros más vendidos (mes actual)

---

## 🔌 Backend (a reemplazar por mocks)

Todos los accesos a datos deben pasar por **servicios** que inicialmente usen mocks.

### 🛒 Carrito
- `GET /api/shoppingcart/{id}`
- `PUT /api/shoppingcart/{id}`

### 💳 Venta
- `POST /api/sale/`

### 📩 Solicitud de libros
- `POST /api/bookrequest`

### 📘 Libros
- `GET /api/book/{id}`
- `POST /api/book`
- `PUT /api/book/{id}`
- `DELETE /api/book/{id}`

### 📝 Reseñas
- `POST /api/book/{id}/review`
- `GET /api/book/{id}/review`
- `PUT /api/book/{id}/review/{id}`
- `DELETE /api/book/{id}/review/{id}`

### 📊 Reportes
- `GET /api/salereport?startDate=&endDate=`

---

## 🧪 Mocking

- Crear una carpeta `/mocks`
- Cada endpoint debe tener su mock correspondiente
- Ejemplo:
