import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/App.module.css';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>📚 BookStore</div>
      {user && (
        <div className={styles.flex}>
          <span>{user.name}</span>
          <button onClick={handleLogout} className={styles.buttonSecondary}>
            Cerrar Sesión
          </button>
        </div>
      )}
    </header>
  );
};

