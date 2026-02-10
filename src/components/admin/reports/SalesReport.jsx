import { useState } from 'react';
import { orderService } from '../../../services/order/orderService';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { formatCurrency, formatDate } from '../../../utils/formatters';
import styles from '../../../styles/App.module.css';

export const SalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      setError('Debes seleccionar ambas fechas');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError('La fecha de inicio debe ser anterior a la fecha final');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await orderService.getSalesByDateRange(startDate, endDate);
      if (result.success) {
        setReport(result.data);
      } else {
        setError('Error al generar el reporte');
      }
    } catch (err) {
      setError('Error al generar el reporte');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    if (!report) return;

    const csv = [
      ['Reporte de Ventas'],
      [`Período: ${formatDate(startDate)} a ${formatDate(endDate)}`],
      [''],
      ['Total de Ventas', formatCurrency(report.total)],
      ['Número de Pedidos', report.count],
      [''],
      ['Detalle de Ventas'],
      ['ID', 'Cliente', 'Libros', 'Total', 'Fecha'],
      ...report.map(order => [
        order.id,
        order.userName,
        order.items.map(i => i.title).join('; '),
        formatCurrency(order.total),
        formatDate(order.orderDate),
      ]),
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-ventas-${startDate}-${endDate}.csv`;
    a.click();
  };

  return (
    <div>
      <h1>📈 Reportes de Ventas</h1>

      <div className={styles.card} style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Filtrar por fecha</h3>

        {error && <div className={styles.errorMessageBox}>{error}</div>}

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className={styles.label}>Fecha Inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.input}
            />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label className={styles.label}>Fecha Fin</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleGenerateReport}
            className={`${styles.button} ${styles.buttonPrimary}`}
            disabled={loading}
          >
            {loading ? 'Generando...' : '🔍 Generar Reporte'}
          </button>
          {report && (
            <button
              onClick={handleExport}
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              📥 Descargar CSV
            </button>
          )}
        </div>
      </div>

      {loading && <LoadingSpinner />}

      {report && (
        <div>
          <div className={styles.card} style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Resumen del Período</h3>

            <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div>
                <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Total de Ventas</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
                  {formatCurrency(report.total)}
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Número de Pedidos</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
                  {report.count}
                </p>
              </div>
              <div>
                <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Venta Promedio</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                  {report.count > 0 ? formatCurrency(report.total / report.count) : formatCurrency(0)}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <h3 style={{ marginBottom: '1rem' }}>Detalle de Ventas</h3>

            {report.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>
                No hay ventas en el período seleccionado
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className={styles.table}>
                  <thead className={styles.tableHeader}>
                    <tr>
                      <th>ID Pedido</th>
                      <th>Cliente</th>
                      <th>Libros</th>
                      <th>Total</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody className={styles.tableBody}>
                    {report.map(order => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.userName}</td>
                        <td>
                          <div style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {order.items.map(item => item.title).join(', ')}
                          </div>
                        </td>
                        <td>{formatCurrency(order.total)}</td>
                        <td>{formatDate(order.orderDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

