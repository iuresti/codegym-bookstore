import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useAuth';
import styles from '../styles/App.module.css';

export const ClientDashboard = () => {
  const { user } = useAuth();
  const { loadCart } = useCart();

  useEffect(() => {
    if (user) {
      loadCart(user.id);
    }
  }, [user, loadCart]);

  return (
    <div className={styles.appContainer}>
      <Header />
      <div className={styles.mainContent}>
        <Navbar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

