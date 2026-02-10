import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { bookRequestService } from '../../../services/bookRequest/bookRequestService';
import { validateBookRequestForm } from '../../../utils/validators';
import styles from '../../../styles/App.module.css';

export const BookRequestForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    bookTitle: '',
    author: '',
    genre: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const genres = [
    'Ficción',
    'No ficción',
    'Novela',
    'Ciencia Ficción',
    'Fantasía',
    'Misterio',
    'Romance',
    'Drama',
    'Historia',
    'Biografía',
    'Infantil',
    'Poesía',
    'Otro',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateBookRequestForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setErrors({});
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const result = await bookRequestService.createBookRequest(
        user.id,
        user.name,
        formData.bookTitle,
        formData.author,
        formData.genre
      );

      if (result.success) {
        setSuccessMessage('¡Solicitud enviada exitosamente! Nos pondremos en contacto pronto.');
        setFormData({ bookTitle: '', author: '', genre: '' });
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        setErrorMessage(result.error || 'Error al enviar la solicitud');
      }
    } catch (err) {
      setErrorMessage('Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>📝 Solicitar un Libro</h1>

      <p style={{ marginBottom: '2rem', color: 'var(--text-light)' }}>
        ¿No encontraste el libro que buscas? Cuéntanos cuál te gustaría que tuviéramos en nuestro catálogo.
      </p>

      <div className={styles.card} style={{ maxWidth: '600px' }}>
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
        {errorMessage && <div className={styles.errorMessageBox}>{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Título del Libro *</label>
            <input
              type="text"
              name="bookTitle"
              value={formData.bookTitle}
              onChange={handleChange}
              className={`${styles.input} ${errors.bookTitle ? styles.error : ''}`}
              placeholder="Ej: El señor de los anillos"
              disabled={loading}
            />
            {errors.bookTitle && <div className={styles.errorMessage}>{errors.bookTitle}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Autor *</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`${styles.input} ${errors.author ? styles.error : ''}`}
              placeholder="Ej: J.R.R. Tolkien"
              disabled={loading}
            />
            {errors.author && <div className={styles.errorMessage}>{errors.author}</div>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Género *</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={`${styles.select} ${errors.genre ? styles.error : ''}`}
              disabled={loading}
            >
              <option value="">Selecciona un género</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            {errors.genre && <div className={styles.errorMessage}>{errors.genre}</div>}
          </div>

          <button
            type="submit"
            className={`${styles.button} ${styles.buttonPrimary}`}
            disabled={loading}
          >
            {loading ? 'Enviando...' : '✓ Enviar solicitud'}
          </button>
        </form>
      </div>
    </div>
  );
};

