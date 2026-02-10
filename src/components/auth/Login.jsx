import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { validateLogin } from '../../utils/validators';
import styles from '../../styles/App.module.css';

export const Login = () => {
  const [email, setEmail] = useState('admin@bookstore.com');
  const [password, setPassword] = useState('admin123');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    // Validate form
    const validation = validateLogin(email, password);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    const result = await login(email, password);

    if (result.success) {
      // Redirect based on role
      if (result.user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/client/books');
      }
    } else {
      setGeneralError(result.error || 'Error al iniciar sesión');
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--light-bg)',
    }}>
      <div className={styles.card} style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className={styles.textCenter} style={{ marginBottom: '2rem' }}>📚 BookStore</h1>
        <h2 className={styles.textCenter} style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>
          Iniciar Sesión
        </h2>

        {generalError && (
          <div className={styles.errorMessageBox}>{generalError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              placeholder="tu@email.com"
              disabled={loading}
            />
            {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} ${errors.password ? styles.error : ''}`}
              placeholder="••••••"
              disabled={loading}
            />
            {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
          </div>

          <button
            type="submit"
            className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonBlock}`}
            disabled={loading}
            style={{ marginBottom: '1rem' }}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--light-bg)', borderRadius: 'var(--radius-md)' }}>
          <h3>Credenciales de prueba:</h3>
          <p><strong>Admin:</strong> admin@bookstore.com / admin123</p>
          <p><strong>Cliente:</strong> cliente@bookstore.com / cliente123</p>
        </div>
      </div>
    </div>
  );
};

