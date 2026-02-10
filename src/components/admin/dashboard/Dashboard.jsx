import { useState, useEffect } from 'react';
import { reportService } from '../../../services/report/reportService';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { formatCurrency } from '../../../utils/formatters';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from '../../../styles/App.module.css';

const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#e67e22'];

export const Dashboard = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await reportService.getSalesReportCurrentMonth();
      if (result.success) {
        setReport(result.data);
      } else {
        setError('Error al cargar el reporte');
      }
    } catch (err) {
      setError('Error al cargar el reporte');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!report) return <div className={styles.errorMessageBox}>Error al cargar el dashboard</div>;

  return (
    <div>
      <h1>📊 Dashboard Administrativo</h1>

      {error && <div className={styles.errorMessageBox}>{error}</div>}

      <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '2rem' }}>
        <div className={styles.card} style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Ingresos Total</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
            {formatCurrency(report.totalSales || 0)}
          </p>
        </div>
        <div className={styles.card} style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Total Órdenes</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
            {report.totalOrders || 0}
          </p>
        </div>
        <div className={styles.card} style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Tickets Vendidos</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
            {report.totalQuantity || 0}
          </p>
        </div>
        <div className={styles.card} style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>Venta Promedio</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-color)' }}>
            {formatCurrency(report.averageOrderValue || 0)}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem' }}>
        <div className={styles.card}>
          <h3 style={{ marginBottom: '1rem' }}>Ventas por Género</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={report.salesByGenre}
                dataKey="sales"
                nameKey="genre"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {report.salesByGenre.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card}>
          <h3 style={{ marginBottom: '1rem' }}>Libros Más Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={report.topBooks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => `${value} libros`} />
              <Bar dataKey="sales" fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={styles.card} style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Detalle por Género</h3>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th>Género</th>
              <th>Libros Vendidos</th>
              <th>Ingresos</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {report.salesByGenre.map(genre => (
              <tr key={genre.genre}>
                <td>{genre.genre}</td>
                <td>{genre.quantity}</td>
                <td>{formatCurrency(genre.sales)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

