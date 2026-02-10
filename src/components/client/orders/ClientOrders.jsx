import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { orderService } from '../../../services/order/orderService';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { formatCurrency, formatDateTime } from '../../../utils/formatters';
import styles from '../../../styles/App.module.css';

export const ClientOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await orderService.getOrdersByUserId(user.id);
      if (result.success) {
        setOrders(result.data);
      } else {
        setError('Error al cargar los pedidos');
      }
    } catch (err) {
      setError('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>📦 Mis Pedidos</h1>

      {error && <div className={styles.errorMessageBox}>{error}</div>}

      {orders.length === 0 ? (
        <div className={styles.card} style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No tienes pedidos aún</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {orders.map(order => (
            <div key={order.id} className={styles.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h3>Pedido #{order.id}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                    {formatDateTime(order.orderDate)}
                  </p>
                </div>
                <span className={order.status === 'completado' ? styles.badgeSuccess : styles.badgeWarning}>
                  {order.status === 'completado' ? '✓ Completado' : '⏱ Pendiente'}
                </span>
              </div>

              <table className={styles.table} style={{ marginBottom: '1rem' }}>
                <thead className={styles.tableHeader}>
                  <tr>
                    <th>Libro</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody className={styles.tableBody}>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.price)}</td>
                      <td>{formatCurrency(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                  Total: {formatCurrency(order.total)}
                </p>
              </div>

              {order.completedDate && (
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '1rem' }}>
                  Completado: {formatDateTime(order.completedDate)}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

