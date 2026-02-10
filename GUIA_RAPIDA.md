# 🎯 Guía Rápida de Inicio - BookStore Frontend

## ⚡ Inicio Rápido (5 minutos)

### 1. Instalar y ejecutar
```bash
cd bookstore
npm install
npm run dev
```

### 2. Acceder a la aplicación
- **URL**: http://localhost:5173
- Se abrirá automáticamente en tu navegador

### 3. Login con credenciales de prueba

#### Como Cliente:
```
Email: cliente@bookstore.com
Contraseña: cliente123
```
**Verás**: Catálogo de libros, carrito, reseñas, solicitudes

#### Como Administrador:
```
Email: admin@bookstore.com
Contraseña: admin123
```
**Verás**: Dashboard, inventario, pedidos, promociones, reportes

---

## 🗺️ Mapa de Rutas

### Cliente (`/client`)
```
/client/books          → Listado de libros (búsqueda, filtros)
/client/books/:id      → Detalle de libro (reseñas, agregar carrito)
/client/cart           → Carrito de compras (modificar, comprar)
/client/orders         → Historial de pedidos
/client/requests       → Solicitar libros no disponibles
```

### Administrador (`/admin`)
```
/admin/dashboard       → Dashboard (gráficos, métricas)
/admin/inventory       → Gestión de libros (CRUD)
/admin/orders          → Gestión de pedidos
/admin/promotions      → Gestión de promociones
/admin/reports         → Reportes de ventas
/admin/requests        → Solicitudes de clientes
```

---

## 📊 Datos de Prueba Disponibles

### Libros (20 títulos)
- El Quijote, Cien años de soledad, 1984...
- Todos con géneros, precios, stock, ratings

### Usuarios (3)
- admin@bookstore.com (ADMIN)
- cliente@bookstore.com (CLIENT)
- maria@bookstore.com (CLIENT)

### Promociones (3)
- Enero en Descuento (15%)
- Febrero Flash Sale (20%)
- Primavera (10%)

### Pedidos (2 ejemplos)
- Historial de compras para probar

---

## 🧪 Acciones para Probar

### Como Cliente
1. ✅ Buscar libros por título ("Quijote")
2. ✅ Filtrar por género ("Novela")
3. ✅ Ver detalles del libro
4. ✅ Dejar una reseña
5. ✅ Agregar libros al carrito
6. ✅ Modificar cantidad en carrito
7. ✅ Completar compra
8. ✅ Ver historial de pedidos
9. ✅ Solicitar un libro nuevo

### Como Administrador
1. ✅ Ver dashboard con gráficos
2. ✅ Crear un nuevo libro
3. ✅ Editar un libro existente
4. ✅ Eliminar un libro
5. ✅ Ver y marcar pedidos como completados
6. ✅ Crear una nueva promoción
7. ✅ Editar/eliminar promociones
8. ✅ Generar reporte por fechas
9. ✅ Exportar reporte a CSV
10. ✅ Ver solicitudes de libros

---

## 💡 Tips Útiles

### Desarrollo
```bash
npm run dev           # Servidor de desarrollo
npm run build         # Compilar para producción
npm run preview       # Ver build local
```

### Estructura del Código
- `src/components` - Componentes React
- `src/services` - Lógica de datos (fácil de cambiar a backend)
- `src/mocks` - Datos de prueba locales
- `src/context` - Estado global (Auth, Cart)
- `src/utils` - Funciones auxiliares

### Flujo de Datos
```
Componentes → Services → Mocks (o Backend futuro)
```

---

## 🔧 Configuración

### Variables de Entorno
Crear `.env` basado en `.env.example`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=BookStore
```

### Cambiar a Backend Real
1. Editar `src/services/*/` para usar axios real
2. Reemplazar `src/mocks/` con llamadas a API
3. No cambiar componentes (arquitectura desacoplada)

---

## 📱 Funcionalidades Principales

### Cliente
| Feature | Estado |
|---------|--------|
| Búsqueda de libros | ✅ Funcional |
| Filtrado por género | ✅ Funcional |
| Detalle de libro | ✅ Funcional |
| Reseñas | ✅ CRUD completo |
| Carrito | ✅ Completo |
| Checkout | ✅ Funcional |
| Historial | ✅ Funcional |
| Solicitudes | ✅ Funcional |

### Administrador
| Feature | Estado |
|---------|--------|
| Dashboard | ✅ Con gráficos |
| Inventario | ✅ CRUD |
| Pedidos | ✅ Marcar completado |
| Promociones | ✅ CRUD |
| Reportes | ✅ Filtros + CSV |
| Solicitudes | ✅ Procesar |

---

## 🐛 Troubleshooting

### Puerto 5173 ya en uso
```bash
# Cambiar puerto en vite.config.js
server: {
  port: 3000  // O el puerto que prefieras
}
```

### Errores de módulos
```bash
rm -rf node_modules package-lock.json
npm install
```

### Carrito vacío después de recargar
Los datos están en mocks locales. Para persistencia real, usar backend o localStorage mejorado.

---

## 📞 Soporte

- 📖 Leer README.md para documentación completa
- 📋 Ver PROYECTO_COMPLETADO.md para descripción del proyecto
- 💻 Inspeccionar Network tab para ver llamadas de API

---

## 🚀 Próximos Pasos

1. **Fase 1**: Familiarizarse con la app (15 min)
2. **Fase 2**: Entender la arquitectura (30 min)
3. **Fase 3**: Conectar a backend real (2-4 horas)
4. **Fase 4**: Desplegar a producción (1 hora)

---

**¡Lista para usar! Happy coding! 🎉**

