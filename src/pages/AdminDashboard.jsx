import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import styles from '../styles/App.module.css';

export const AdminDashboard = () => {
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

