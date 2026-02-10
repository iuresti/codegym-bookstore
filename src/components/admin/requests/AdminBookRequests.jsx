import { useState, useEffect } from 'react';
import { bookRequestService } from '../../../services/bookRequest/bookRequestService';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { formatDate } from '../../../utils/formatters';
import styles from '../../../styles/App.module.css';

export const AdminBookRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await bookRequestService.getAllBookRequests();
      if (result.success) {
        setRequests(result.data);
      } else {
        setError('Error al cargar las solicitudes');
      }
    } catch (err) {
      setError('Error al cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const result = await bookRequestService.updateBookRequestStatus(id, newStatus);
      if (result.success) {
        setRequests(requests.map(r => r.id === id ? result.data : r));
        setSuccessMessage('Solicitud actualizada correctamente');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(result.error || 'Error al actualizar la solicitud');
      }
    } catch (err) {
      setError('Error al actualizar la solicitud');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta solicitud?')) return;

    try {
      const result = await bookRequestService.deleteBookRequest(id);
      if (result.success) {
        setRequests(requests.filter(r => r.id !== id));
        setSuccessMessage('Solicitud eliminada correctamente');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError(result.error || 'Error al eliminar la solicitud');
      }
    } catch (err) {
      setError('Error al eliminar la solicitud');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>💌 Solicitudes de Libros</h1>

      {error && <div className={styles.errorMessageBox}>{error}</div>}
      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      {requests.length === 0 ? (
        <div className={styles.card} style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No hay solicitudes de libros</p>
        </div>
      ) : (
        <div className={styles.card}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Cliente</th>
                <th>Título Solicitado</th>
                <th>Autor</th>
                <th>Género</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {requests.map(request => (
                <tr key={request.id}>
                  <td>{request.userName}</td>
                  <td>{request.bookTitle}</td>
                  <td>{request.author}</td>
                  <td>{request.genre}</td>
                  <td>{formatDate(request.requestDate)}</td>
                  <td>
                    <span className={request.status === 'procesado' ? styles.badgeSuccess : styles.badgeWarning}>
                      {request.status === 'pendiente' ? '⏱ Pendiente' : '✓ Procesado'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {request.status === 'pendiente' && (
                        <button
                          onClick={() => handleUpdateStatus(request.id, 'procesado')}
                          className={`${styles.button} ${styles.buttonSuccess} ${styles.buttonSmall}`}
                        >
                          ✓ Procesar
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(request.id)}
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
      )}
    </div>
  );
};

