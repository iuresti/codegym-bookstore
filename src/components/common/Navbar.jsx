import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/useAuth';
import styles from '../../styles/App.module.css';

export const Navbar = () => {
  const { isAdmin, isClient } = useUser();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <nav className={styles.sidebar}>
      <h3 style={{ marginBottom: '2rem', color: 'white' }}>Menú</h3>
      <ul className={styles.nav} style={{ flexDirection: 'column', gap: '1rem' }}>
        {isClient && (
          <>
            <li>
              <Link
                to="/client/books"
                className={`${styles.navLink} ${isActive('/client/books') ? styles.active : ''}`}
              >
                📘 Libros
              </Link>
            </li>
            <li>
              <Link
                to="/client/cart"
                className={`${styles.navLink} ${isActive('/client/cart') ? styles.active : ''}`}
              >
                🛒 Carrito
              </Link>
            </li>
            <li>
              <Link
                to="/client/requests"
                className={`${styles.navLink} ${isActive('/client/requests') ? styles.active : ''}`}
              >
                📝 Mis Solicitudes
              </Link>
            </li>
            <li>
              <Link
                to="/client/orders"
                className={`${styles.navLink} ${isActive('/client/orders') ? styles.active : ''}`}
              >
                📦 Mis Pedidos
              </Link>
            </li>
          </>
        )}

        {isAdmin && (
          <>
            <li>
              <Link
                to="/admin/dashboard"
                className={`${styles.navLink} ${isActive('/admin/dashboard') ? styles.active : ''}`}
              >
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/inventory"
                className={`${styles.navLink} ${isActive('/admin/inventory') ? styles.active : ''}`}
              >
                📚 Inventario
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className={`${styles.navLink} ${isActive('/admin/orders') ? styles.active : ''}`}
              >
                📦 Pedidos
              </Link>
            </li>
            <li>
              <Link
                to="/admin/promotions"
                className={`${styles.navLink} ${isActive('/admin/promotions') ? styles.active : ''}`}
              >
                🎯 Promociones
              </Link>
            </li>
            <li>
              <Link
                to="/admin/reports"
                className={`${styles.navLink} ${isActive('/admin/reports') ? styles.active : ''}`}
              >
                📈 Reportes
              </Link>
            </li>
            <li>
              <Link
                to="/admin/requests"
                className={`${styles.navLink} ${isActive('/admin/requests') ? styles.active : ''}`}
              >
                💌 Solicitudes
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

