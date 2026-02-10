import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../hooks/useAuth';
import { useAuth } from '../../../hooks/useAuth';
import { orderService } from '../../../services/order/orderService';
import { formatCurrency, formatDate, formatTimeRemaining } from '../../../utils/formatters';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import styles from '../../../styles/App.module.css';

export const CartPage = () => {
  const { user } = useAuth();
  const { cart, loading, removeFromCart, updateItemQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (loading) return <LoadingSpinner />;

  const handleRemoveItem = async (bookId) => {
    await removeFromCart(user.id, bookId);
  };

  const handleUpdateQuantity = async (bookId, quantity) => {
    if (quantity > 0) {
      await updateItemQuantity(user.id, bookId, quantity);
    }
  };

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) {
      setError('El carrito está vacío');
      return;
    }

    setCheckoutLoading(true);
    setError('');

    try {
      const result = await orderService.createOrder(
        user.id,
        user.name,
        cart.items,
        getCartTotal()
      );

      if (result.success) {
        setSuccessMessage('¡Pedido creado exitosamente!');
        await clearCart(user.id);
        setTimeout(() => {
          navigate('/client/orders');
        }, 2000);
      } else {
        setError(result.error || 'Error al crear el pedido');
      }
    } catch (err) {
      setError('Error al procesar la compra');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      await clearCart(user.id);
    }
  };

  if (!cart) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>🛒 Mi Carrito</h1>

      {error && <div className={styles.errorMessageBox}>{error}</div>}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      {cart.items.length === 0 ? (
        <div className={styles.card} style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>El carrito está vacío</p>
          <button
            onClick={() => navigate('/client/books')}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            Ir a comprar libros
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
          <div>
            <div className={styles.card} style={{ marginBottom: '2rem' }}>
              <h3>Información del carrito</h3>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Última actualización:</strong> {formatDate(cart.lastUpdated)}
              </p>
              <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
                {formatTimeRemaining(cart.expiresAt)}
              </p>
            </div>

            <div className={styles.card}>
              <h3 style={{ marginBottom: '1rem' }}>Artículos</h3>
              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr>
                    <th>Libro</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {cart.items.map(item => (
                    <tr key={item.bookId}>
                      <td>{item.title}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.bookId, parseInt(e.target.value) || 1)}
                          className={styles.input}
                          style={{ maxWidth: '60px' }}
                        />
                      </td>
                      <td>{formatCurrency(item.price * item.quantity)}</td>
                      <td>
                        <button
                          onClick={() => handleRemoveItem(item.bookId)}
                          className={`${styles.button} ${styles.buttonDanger} ${styles.buttonSmall}`}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className={styles.card} style={{ position: 'sticky', top: '20px' }}>
              <h3 style={{ marginBottom: '1rem' }}>Resumen</h3>

              <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Subtotal:</span>
                  <span>{formatCurrency(getCartTotal())}</span>
                </p>
                <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-light)' }}>
                  <span>Envío:</span>
                  <span>Gratis</span>
                </p>
                <p style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)' }}>
                  <span>Impuestos:</span>
                  <span>{formatCurrency(getCartTotal() * 0.16)}</span>
                </p>
              </div>

              <p style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                <span>Total:</span>
                <span>{formatCurrency(getCartTotal() * 1.16)}</span>
              </p>

              <button
                onClick={handleCheckout}
                className={`${styles.button} ${styles.buttonSuccess} ${styles.buttonBlock}`}
                disabled={checkoutLoading || cart.items.length === 0}
                style={{ marginBottom: '1rem' }}
              >
                {checkoutLoading ? 'Procesando...' : '✓ Completar compra'}
              </button>

              <button
                onClick={handleClearCart}
                className={`${styles.button} ${styles.buttonSecondary} ${styles.buttonBlock}`}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

