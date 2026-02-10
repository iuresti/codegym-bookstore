import styles from '../../styles/App.module.css';

export const LoadingSpinner = ({ message = 'Cargando...' }) => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div className={styles.spinner}></div>
      <p>{message}</p>
    </div>
  );
};

