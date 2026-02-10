import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookService } from '../../../services/book/bookService';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { formatCurrency } from '../../../utils/formatters';
import styles from '../../../styles/App.module.css';

export const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
        setFilteredBooks(result.data);
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    filterBooks(query, selectedGenre);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    filterBooks(searchQuery, genre);
  };

  const filterBooks = (query, genre) => {
    let filtered = books;

    if (query.trim()) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (genre) {
      filtered = filtered.filter(book => book.genre === genre);
    }

    setFilteredBooks(filtered);
  };

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>📘 Libros</h1>

      {error && <div className={styles.errorMessageBox}>{error}</div>}

      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.input}
          style={{ flex: 1, minWidth: '200px' }}
        />
        <select
          value={selectedGenre}
          onChange={(e) => handleGenreChange(e.target.value)}
          className={styles.select}
          style={{ minWidth: '150px' }}
        >
          <option value="">Todos los géneros</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))' }}>
        {paginatedBooks.map(book => (
          <Link key={book.id} to={`/client/books/${book.id}`} style={{ textDecoration: 'none' }}>
            <div className={styles.card}>
              <img
                src={book.imageUrl}
                alt={book.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}
              />
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{book.title}</h3>
              <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>por {book.author}</p>
              <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                {book.genre}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
                  {formatCurrency(book.price)}
                </span>
                <span className={styles.badgePrimary}>⭐ {book.rating}</span>
              </div>
              {book.stock <= 5 && book.stock > 0 && (
                <p style={{ color: 'var(--warning-color)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  ⚠️ Solo {book.stock} en stock
                </p>
              )}
              {book.stock === 0 && (
                <p style={{ color: 'var(--danger-color)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                  ❌ Sin stock
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className={styles.textCenter} style={{ padding: '2rem' }}>
          <p>No se encontraron libros</p>
        </div>
      )}

      {totalPages > 1 && (
        <ul className={styles.pagination} style={{ marginTop: '2rem' }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <li key={page}>
              <button
                className={`${styles.paginationItem} ${currentPage === page ? styles.active : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

