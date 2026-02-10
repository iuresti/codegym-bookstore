import { Link } from 'react-router-dom';
import styles from '../styles/App.module.css';

export const NotFoundPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--light-bg)',
    }}>
      <h1 style={{ fontSize: '4rem', margin: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '1rem' }}>Página no encontrada</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--text-light)' }}>
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link to="/" className={`${styles.button} ${styles.buttonPrimary}`}>
        Volver al inicio
      </Link>
    </div>
  );
};

