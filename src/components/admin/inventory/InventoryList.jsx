import { useState, useEffect } from 'react';
import { bookService } from '../../../services/book/bookService';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { formatCurrency } from '../../../utils/formatters';
import { validateBookForm } from '../../../utils/validators';
import styles from '../../../styles/App.module.css';

export const InventoryList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    stock: '',
    description: '',
    rating: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    loadBooks();
    loadGenres();
  }, []);

  const loadBooks = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await bookService.getAllBooks();
      if (result.success) {
        setBooks(result.data);
      } else {
        setError('Error al cargar los libros');
      }
    } catch (err) {
      setError('Error al cargar los libros');
    } finally {
      setLoading(false);
    }
  };

  const loadGenres = async () => {
    try {
      const result = await bookService.getGenres();
      if (result.success) {
        setGenres(result.data);
      }
    } catch (err) {
      console.error('Error al cargar géneros');
    }
  };

  const handleOpenForm = (book = null) => {
    if (book) {
      setEditingId(book.id);
      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        price: book.price,
        stock: book.stock,
        description: book.description,
        rating: book.rating,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        author: '',
        genre: '',
        price: '',
        stock: '',
        description: '',
        rating: '',
      });
    }
    setFormErrors({});
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateBookForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    try {
      let result;
      if (editingId) {
        result = await bookService.updateBook(editingId, formData);
        if (result.success) {
          setBooks(books.map(b => b.id === editingId ? result.data : b));
          setSuccessMessage('Libro actualizado correctamente');
        }
      } else {
        result = await bookService.createBook(formData);
        if (result.success) {
          setBooks([...books, result.data]);
          setSuccessMessage('Libro creado correctamente');
        }
      }

      if (!result.success) {
        setError(result.error || 'Error al guardar el libro');
      } else {
        setShowForm(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      setError('Error al guardar el libro');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este libro?')) return;

    try {
      const result = await bookService.deleteBook(id);
      if (result.success) {
        setBooks(books.filter(b => b.id !== id));
        setSuccessMessage('Libro eliminado correctamente');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(result.error || 'Error al eliminar el libro');
      }
    } catch (err) {
      setError('Error al eliminar el libro');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>📚 Inventario</h1>
        {!showForm && (
          <button
            onClick={() => handleOpenForm()}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            ➕ Nuevo Libro
          </button>
        )}
      </div>

      {error && <div className={styles.errorMessageBox}>{error}</div>}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      {showForm && (
        <div className={styles.card} style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>
            {editingId ? 'Editar Libro' : 'Nuevo Libro'}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Título *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`${styles.input} ${formErrors.title ? styles.error : ''}`}
                  placeholder="Título del libro"
                />
                {formErrors.title && <div className={styles.errorMessage}>{formErrors.title}</div>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Autor *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className={`${styles.input} ${formErrors.author ? styles.error : ''}`}
                  placeholder="Nombre del autor"
                />
                {formErrors.author && <div className={styles.errorMessage}>{formErrors.author}</div>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Género *</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className={`${styles.select} ${formErrors.genre ? styles.error : ''}`}
                >
                  <option value="">Selecciona un género</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
                {formErrors.genre && <div className={styles.errorMessage}>{formErrors.genre}</div>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Precio *</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`${styles.input} ${formErrors.price ? styles.error : ''}`}
                  placeholder="0.00"
                />
                {formErrors.price && <div className={styles.errorMessage}>{formErrors.price}</div>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Stock *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className={`${styles.input} ${formErrors.stock ? styles.error : ''}`}
                  placeholder="0"
                />
                {formErrors.stock && <div className={styles.errorMessage}>{formErrors.stock}</div>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Calificación</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="0.0"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Descripción *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`${styles.textarea} ${formErrors.description ? styles.error : ''}`}
                placeholder="Descripción del libro"
                rows="3"
              ></textarea>
              {formErrors.description && <div className={styles.errorMessage}>{formErrors.description}</div>}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="submit"
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                {editingId ? '✓ Actualizar' : '✓ Crear'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className={styles.buttonSecondary}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.card}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Género</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{formatCurrency(book.price)}</td>
                <td>
                  <span className={book.stock > 0 ? styles.badgeSuccess : styles.badgeDanger}>
                    {book.stock}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleOpenForm(book)}
                      className={`${styles.button} ${styles.buttonSecondary} ${styles.buttonSmall}`}
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className={`${styles.button} ${styles.buttonDanger} ${styles.buttonSmall}`}
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

