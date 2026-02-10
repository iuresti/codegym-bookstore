import { useState, useEffect } from 'react';
import { promotionService } from '../../../services/promotion/promotionService';
import { bookService } from '../../../services/book/bookService';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { formatDate, formatCurrency } from '../../../utils/formatters';
import { validatePromotionForm } from '../../../utils/validators';
import styles from '../../../styles/App.module.css';

export const PromotionsList = () => {
  const [promotions, setPromotions] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    discountPercentage: '',
    startDate: '',
    endDate: '',
    minPurchaseAmount: '',
    maxBooks: '',
    bookIds: [],
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadPromotions();
    loadBooks();
  }, []);

  const loadPromotions = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await promotionService.getAllPromotions();
      if (result.success) {
        setPromotions(result.data);
      } else {
        setError('Error al cargar las promociones');
      }
    } catch (err) {
      setError('Error al cargar las promociones');
    } finally {
      setLoading(false);
    }
  };

  const loadBooks = async () => {
    try {
      const result = await bookService.getAllBooks();
      if (result.success) {
        setBooks(result.data);
      }
    } catch (err) {
      console.error('Error al cargar libros');
    }
  };

  const handleOpenForm = (promotion = null) => {
    if (promotion) {
      setEditingId(promotion.id);
      setFormData({
        name: promotion.name,
        description: promotion.description,
        discountPercentage: promotion.discountPercentage,
        startDate: promotion.startDate.split('T')[0],
        endDate: promotion.endDate.split('T')[0],
        minPurchaseAmount: promotion.minPurchaseAmount || '',
        maxBooks: promotion.maxBooks || '',
        bookIds: promotion.bookIds,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        description: '',
        discountPercentage: '',
        startDate: '',
        endDate: '',
        minPurchaseAmount: '',
        maxBooks: '',
        bookIds: [],
      });
    }
    setFormErrors({});
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const bookId = parseInt(value);
      setFormData(prev => ({
        ...prev,
        bookIds: checked
          ? [...prev.bookIds, bookId]
          : prev.bookIds.filter(id => id !== bookId),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validatePromotionForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    try {
      let result;
      if (editingId) {
        result = await promotionService.updatePromotion(editingId, formData);
        if (result.success) {
          setPromotions(promotions.map(p => p.id === editingId ? result.data : p));
          setSuccessMessage('Promoción actualizada correctamente');
        }
      } else {
        result = await promotionService.createPromotion(formData);
        if (result.success) {
          setPromotions([...promotions, result.data]);
          setSuccessMessage('Promoción creada correctamente');
        }
      }

      if (!result.success) {
        setError(result.error || 'Error al guardar la promoción');
      } else {
        setShowForm(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      setError('Error al guardar la promoción');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta promoción?')) return;

    try {
      const result = await promotionService.deletePromotion(id);
      if (result.success) {
        setPromotions(promotions.filter(p => p.id !== id));
        setSuccessMessage('Promoción eliminada correctamente');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(result.error || 'Error al eliminar la promoción');
      }
    } catch (err) {
      setError('Error al eliminar la promoción');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>🎯 Promociones</h1>
        {!showForm && (
          <button
            onClick={() => handleOpenForm()}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            ➕ Nueva Promoción
          </button>
        )}
      </div>

      {error && <div className={styles.errorMessageBox}>{error}</div>}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      {showForm && (
        <div className={styles.card} style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>
            {editingId ? 'Editar Promoción' : 'Nueva Promoción'}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nombre *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.input} ${formErrors.name ? styles.error : ''}`}
                  placeholder="Nombre de la promoción"
                />
                {formErrors.name && <div className={styles.errorMessage}>{formErrors.name}</div>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Descuento (%) *</label>
                <input
                  type="number"
                  step="0.01"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleChange}
                  className={`${styles.input} ${formErrors.discountPercentage ? styles.error : ''}`}
                  placeholder="0"
                />
                {formErrors.discountPercentage && <div className={styles.errorMessage}>{formErrors.discountPercentage}</div>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Fecha Inicio *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className={`${styles.input} ${formErrors.startDate ? styles.error : ''}`}
                />
                {formErrors.startDate && <div className={styles.errorMessage}>{formErrors.startDate}</div>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Fecha Término *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`${styles.input} ${formErrors.endDate ? styles.error : ''}`}
                />
                {formErrors.endDate && <div className={styles.errorMessage}>{formErrors.endDate}</div>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Compra Mínima ($)</label>
                <input
                  type="number"
                  step="0.01"
                  name="minPurchaseAmount"
                  value={formData.minPurchaseAmount}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="0"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Máximo de Libros</label>
                <input
                  type="number"
                  name="maxBooks"
                  value={formData.maxBooks}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="0"
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
                placeholder="Descripción de la promoción"
                rows="2"
              ></textarea>
              {formErrors.description && <div className={styles.errorMessage}>{formErrors.description}</div>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Libros Aplicables *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', padding: '1rem', backgroundColor: 'var(--light-bg)', borderRadius: 'var(--radius-md)' }}>
                {books.map(book => (
                  <label key={book.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      value={book.id}
                      checked={formData.bookIds.includes(book.id)}
                      onChange={handleChange}
                    />
                    {book.title}
                  </label>
                ))}
              </div>
              {formErrors.bookIds && <div className={styles.errorMessage}>{formErrors.bookIds}</div>}
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

      {promotions.length === 0 ? (
        <div className={styles.card} style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No hay promociones aún</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {promotions.map(promotion => (
            <div key={promotion.id} className={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3>{promotion.name}</h3>
                  <p style={{ color: 'var(--text-light)' }}>{promotion.description}</p>
                </div>
                <span className={styles.badgePrimary} style={{ fontSize: '1.5rem' }}>
                  -{promotion.discountPercentage}%
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem', padding: '1rem', backgroundColor: 'var(--light-bg)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Vigencia</p>
                  <p style={{ fontWeight: 'bold' }}>
                    {formatDate(promotion.startDate)} a {formatDate(promotion.endDate)}
                  </p>
                </div>
                {promotion.minPurchaseAmount && (
                  <div>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Compra Mínima</p>
                    <p style={{ fontWeight: 'bold' }}>{formatCurrency(promotion.minPurchaseAmount)}</p>
                  </div>
                )}
                {promotion.maxBooks && (
                  <div>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Máximo de Libros</p>
                    <p style={{ fontWeight: 'bold' }}>{promotion.maxBooks}</p>
                  </div>
                )}
              </div>

              <p style={{ marginBottom: '1rem', color: 'var(--text-light)', fontSize: '0.9rem' }}>
                {promotion.bookIds.length} libro(s) en promoción
              </p>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleOpenForm(promotion)}
                  className={`${styles.button} ${styles.buttonSecondary} ${styles.buttonSmall}`}
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(promotion.id)}
                  className={`${styles.button} ${styles.buttonDanger} ${styles.buttonSmall}`}
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

