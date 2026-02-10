import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookService } from '../../../services/book/bookService';
import { reviewService } from '../../../services/review/reviewService';
import { useCart } from '../../../hooks/useAuth';
import { useAuth } from '../../../hooks/useAuth';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { formatCurrency, formatRating, daysUntilExpiration } from '../../../utils/formatters';
import { validateReview } from '../../../utils/validators';
import styles from '../../../styles/App.module.css';

export const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewErrors, setReviewErrors] = useState({});
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    loadBook();
    loadReviews();
  }, [id]);

  const loadBook = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await bookService.getBookById(id);
      if (result.success) {
        setBook(result.data);
      } else {
        setError('Libro no encontrado');
      }
    } catch (err) {
      setError('Error al cargar el libro');
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    try {
      const result = await reviewService.getReviewsByBookId(id);
      if (result.success) {
        setReviews(result.data);
      }
    } catch (err) {
      console.error('Error al cargar reseñas');
    }
  };

  const handleAddToCart = async () => {
    if (!book) return;

    const result = await addToCart(user.id, book.id, book.title, book.price, parseInt(quantity));
    if (result.success) {
      setSuccessMessage(`${quantity} ${quantity === 1 ? 'libro' : 'libros'} agregado(s) al carrito`);
      setTimeout(() => setSuccessMessage(''), 3000);
      setQuantity(1);
    } else {
      setError(result.error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const validation = validateReview(reviewRating, reviewTitle, reviewComment);
    if (!validation.isValid) {
      setReviewErrors(validation.errors);
      return;
    }

    setReviewLoading(true);
    try {
      const result = await reviewService.createReview(
        parseInt(id),
        user.id,
        user.name,
        reviewRating,
        reviewTitle,
        reviewComment
      );
      if (result.success) {
        setReviews([...reviews, result.data]);
        setReviewRating(5);
        setReviewTitle('');
        setReviewComment('');
        setReviewErrors({});
        setShowReviewForm(false);
      } else {
        setReviewErrors({ general: result.error });
      }
    } catch (err) {
      setReviewErrors({ general: 'Error al crear la reseña' });
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!book) return <div className={styles.errorMessageBox}>Libro no encontrado</div>;

  return (
    <div>
      {error && <div className={styles.errorMessageBox}>{error}</div>}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      <button onClick={() => navigate(-1)} className={styles.buttonSecondary} style={{ marginBottom: '2rem' }}>
        ← Volver
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          <img
            src={book.imageUrl}
            alt={book.title}
            style={{
              width: '100%',
              maxWidth: '400px',
              height: 'auto',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
            }}
          />
        </div>

        <div>
          <h1>{book.title}</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
            por {book.author}
          </p>
          <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
            <span className={styles.badgePrimary}>{book.genre}</span>
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>
              {formatCurrency(book.price)}
            </p>
            <p style={{ color: 'var(--text-light)' }}>
              ⭐ Calificación: {formatRating(book.rating)} / 5.0
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--light-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              {book.stock > 0 ? (
                <span style={{ color: 'var(--success-color)' }}>✓ Disponible ({book.stock} en stock)</span>
              ) : (
                <span style={{ color: 'var(--danger-color)' }}>✗ Sin stock</span>
              )}
            </p>
            <p style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
              Publicado: {new Date(book.publishDate).toLocaleDateString('es-ES')}
            </p>
          </div>

          {book.stock > 0 && (
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <input
                type="number"
                min="1"
                max={book.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.min(parseInt(e.target.value) || 1, book.stock))}
                className={styles.input}
                style={{ maxWidth: '100px' }}
              />
              <button
                onClick={handleAddToCart}
                className={`${styles.button} ${styles.buttonSuccess}`}
              >
                🛒 Agregar al carrito
              </button>
            </div>
          )}

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <h3>Descripción</h3>
            <p style={{ color: 'var(--text-light)', lineHeight: 1.8 }}>
              {book.description}
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', borderTop: '2px solid var(--border-color)', paddingTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Reseñas ({reviews.length})</h2>
          {!showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Escribir reseña
            </button>
          )}
        </div>

        {showReviewForm && (
          <div className={styles.card} style={{ marginBottom: '2rem' }}>
            <h3>Nueva reseña</h3>
            {reviewErrors.general && <div className={styles.errorMessageBox}>{reviewErrors.general}</div>}

            <form onSubmit={handleSubmitReview}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Calificación (1-5)</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(parseInt(e.target.value))}
                  className={styles.select}
                >
                  {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>
                      {rating} {'⭐'.repeat(rating)}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Título</label>
                <input
                  type="text"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className={`${styles.input} ${reviewErrors.title ? styles.error : ''}`}
                  placeholder="Título de la reseña"
                />
                {reviewErrors.title && <div className={styles.errorMessage}>{reviewErrors.title}</div>}
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Comentario</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className={`${styles.textarea} ${reviewErrors.comment ? styles.error : ''}`}
                  placeholder="Tu comentario..."
                  rows="4"
                ></textarea>
                {reviewErrors.comment && <div className={styles.errorMessage}>{reviewErrors.comment}</div>}
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  disabled={reviewLoading}
                >
                  {reviewLoading ? 'Enviando...' : 'Enviar reseña'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className={styles.buttonSecondary}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{ display: 'grid', gap: '1rem' }}>
          {reviews.length === 0 ? (
            <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '2rem' }}>
              No hay reseñas aún. ¡Sé el primero en dejar una!
            </p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                  <div>
                    <h4>{review.title}</h4>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                      por {review.userName} · {'⭐'.repeat(review.rating)} {review.rating}/5
                    </p>
                  </div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                    {new Date(review.date).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

