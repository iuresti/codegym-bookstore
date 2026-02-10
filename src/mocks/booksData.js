// Mock data for books
export const booksData = [
  {
    id: 1,
    title: 'El Quijote',
    author: 'Miguel de Cervantes',
    genre: 'Novela',
    price: 24.99,
    stock: 15,
    description: 'La historia de Don Quijote, el caballero andante más famoso de la literatura española.',
    rating: 4.5,
    imageUrl: 'https://via.placeholder.com/300x400?text=El+Quijote',
    publishDate: '1605-01-16',
  },
  {
    id: 2,
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez',
    genre: 'Realismo Mágico',
    price: 18.99,
    stock: 22,
    description: 'La saga de la familia Buendía en el pueblo ficticio de Macondo.',
    rating: 4.8,
    imageUrl: 'https://via.placeholder.com/300x400?text=Cien+Anos+de+Soledad',
    publishDate: '1967-05-30',
  },
  {
    id: 3,
    title: 'Mujercitas',
    author: 'Louisa May Alcott',
    genre: 'Novela Juvenil',
    price: 14.99,
    stock: 8,
    description: 'La historia de cuatro hermanas durante la Guerra Civil Americana.',
    rating: 4.3,
    imageUrl: 'https://via.placeholder.com/300x400?text=Mujercitas',
    publishDate: '1868-10-01',
  },
  {
    id: 4,
    title: 'El Código Da Vinci',
    author: 'Dan Brown',
    genre: 'Misterio/Thriller',
    price: 16.99,
    stock: 30,
    description: 'Una investigación sobre el arte, la religión y los misterios históricos.',
    rating: 4.1,
    imageUrl: 'https://via.placeholder.com/300x400?text=El+Codigo+Da+Vinci',
    publishDate: '2003-03-18',
  },
  {
    id: 5,
    title: 'El Príncipe',
    author: 'Nicolás Maquiavelo',
    genre: 'Política',
    price: 12.99,
    stock: 12,
    description: 'Tratado de filosofía política sobre el poder y la gobernanza.',
    rating: 3.8,
    imageUrl: 'https://via.placeholder.com/300x400?text=El+Principe',
    publishDate: '1532-01-01',
  },
  {
    id: 6,
    title: 'Orgullo y Prejuicio',
    author: 'Jane Austen',
    genre: 'Romance',
    price: 13.99,
    stock: 19,
    description: 'La historia de Elizabeth Bennet y Mr. Darcy en la Inglaterra del siglo XIX.',
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/300x400?text=Orgullo+y+Prejuicio',
    publishDate: '1813-01-28',
  },
  {
    id: 7,
    title: 'La Metamorfosis',
    author: 'Franz Kafka',
    genre: 'Ficción',
    price: 9.99,
    stock: 25,
    description: 'Un hombre se transforma en una criatura insectil inexplicablemente.',
    rating: 4.0,
    imageUrl: 'https://via.placeholder.com/300x400?text=La+Metamorfosis',
    publishDate: '1915-06-01',
  },
  {
    id: 8,
    title: '1984',
    author: 'George Orwell',
    genre: 'Distopía',
    price: 15.99,
    stock: 28,
    description: 'Una novela de ciencia ficción distópica sobre un totalitarismo extremo.',
    rating: 4.4,
    imageUrl: 'https://via.placeholder.com/300x400?text=1984',
    publishDate: '1949-06-08',
  },
  {
    id: 9,
    title: 'El Gran Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Romance/Drama',
    price: 14.99,
    stock: 17,
    description: 'La historia de Jay Gatsby y su obsesión por Daisy Buchanan.',
    rating: 4.2,
    imageUrl: 'https://via.placeholder.com/300x400?text=El+Gran+Gatsby',
    publishDate: '1925-04-10',
  },
  {
    id: 10,
    title: 'Don Juan Tenorio',
    author: 'José Zorrilla',
    genre: 'Drama',
    price: 11.99,
    stock: 6,
    description: 'La aventura amorosa del famoso libertino Don Juan.',
    rating: 3.9,
    imageUrl: 'https://via.placeholder.com/300x400?text=Don+Juan+Tenorio',
    publishDate: '1844-01-01',
  },
  {
    id: 11,
    title: 'El Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasía',
    price: 17.99,
    stock: 32,
    description: 'La aventura de Bilbo Bolsón en la Tierra Media.',
    rating: 4.7,
    imageUrl: 'https://via.placeholder.com/300x400?text=El+Hobbit',
    publishDate: '1937-09-21',
  },
  {
    id: 12,
    title: 'Rayuela',
    author: 'Julio Cortázar',
    genre: 'Ficción Experimental',
    price: 19.99,
    stock: 9,
    description: 'Una novela experimental que puede leerse de múltiples formas.',
    rating: 4.0,
    imageUrl: 'https://via.placeholder.com/300x400?text=Rayuela',
    publishDate: '1963-06-28',
  },
  {
    id: 13,
    title: 'La Casa de los Espíritus',
    author: 'Isabel Allende',
    genre: 'Realismo Mágico',
    price: 16.99,
    stock: 14,
    description: 'La saga de una familia durante los cambios políticos de América Latina.',
    rating: 4.5,
    imageUrl: 'https://via.placeholder.com/300x400?text=La+Casa+de+los+Espiritus',
    publishDate: '1982-10-05',
  },
  {
    id: 14,
    title: 'Lolita',
    author: 'Vladimir Nabokov',
    genre: 'Novela Negra',
    price: 15.99,
    stock: 11,
    description: 'La obsesión de un protagonista por una joven adolescente.',
    rating: 3.7,
    imageUrl: 'https://via.placeholder.com/300x400?text=Lolita',
    publishDate: '1955-08-18',
  },
  {
    id: 15,
    title: 'La Sombra del Viento',
    author: 'Carlos Ruiz Zafón',
    genre: 'Misterio',
    price: 18.99,
    stock: 20,
    description: 'El misterio de un libro desconocido en la Barcelona post-guerra.',
    rating: 4.6,
    imageUrl: 'https://via.placeholder.com/300x400?text=La+Sombra+del+Viento',
    publishDate: '2001-04-01',
  },
  {
    id: 16,
    title: 'Cándido',
    author: 'Voltaire',
    genre: 'Sátira',
    price: 10.99,
    stock: 16,
    description: 'Una sátira filosófica sobre la vida y las desventuras de Cándido.',
    rating: 3.9,
    imageUrl: 'https://via.placeholder.com/300x400?text=Candido',
    publishDate: '1759-01-01',
  },
  {
    id: 17,
    title: 'El Perfume',
    author: 'Patrick Süskind',
    genre: 'Psicológico',
    price: 14.99,
    stock: 23,
    description: 'La historia de un hombre obsesionado con crear el perfume perfecto.',
    rating: 4.3,
    imageUrl: 'https://via.placeholder.com/300x400?text=El+Perfume',
    publishDate: '1985-09-01',
  },
  {
    id: 18,
    title: 'Matar a un Ruiseñor',
    author: 'Harper Lee',
    genre: 'Drama Social',
    price: 15.99,
    stock: 18,
    description: 'La historia de la injusticia racial en el Sur de Estados Unidos.',
    rating: 4.5,
    imageUrl: 'https://via.placeholder.com/300x400?text=Matar+a+un+Ruisenor',
    publishDate: '1960-07-11',
  },
  {
    id: 19,
    title: 'El Alquimista',
    author: 'Paulo Coelho',
    genre: 'Novela Filosófica',
    price: 13.99,
    stock: 35,
    description: 'La jornada de un joven pastor en busca de sus sueños.',
    rating: 4.2,
    imageUrl: 'https://via.placeholder.com/300x400?text=El+Alquimista',
    publishDate: '1988-01-01',
  },
  {
    id: 20,
    title: 'La Revolución Francesa',
    author: 'Tony Taylor',
    genre: 'Historia',
    price: 22.99,
    stock: 7,
    description: 'Un análisis detallado de los eventos que transformaron Francia.',
    rating: 4.1,
    imageUrl: 'https://via.placeholder.com/300x400?text=La+Revolucion+Francesa',
    publishDate: '2006-03-15',
  },
];

// Helper functions for book operations
export const getBookById = (id) => {
  return booksData.find(book => book.id === parseInt(id));
};

export const getBooksByGenre = (genre) => {
  return booksData.filter(book => book.genre.toLowerCase() === genre.toLowerCase());
};

export const searchBooks = (query) => {
  const lowerQuery = query.toLowerCase();
  return booksData.filter(book =>
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery) ||
    book.genre.toLowerCase().includes(lowerQuery)
  );
};

export const getTopBooks = (limit = 5) => {
  return [...booksData].sort((a, b) => b.rating - a.rating).slice(0, limit);
};

export const addBook = (newBook) => {
  const id = Math.max(...booksData.map(b => b.id)) + 1;
  const book = { ...newBook, id };
  booksData.push(book);
  return book;
};

export const updateBook = (id, updatedData) => {
  const index = booksData.findIndex(book => book.id === parseInt(id));
  if (index !== -1) {
    booksData[index] = { ...booksData[index], ...updatedData, id: parseInt(id) };
    return booksData[index];
  }
  return null;
};

export const deleteBook = (id) => {
  const index = booksData.findIndex(book => book.id === parseInt(id));
  if (index !== -1) {
    booksData.splice(index, 1);
    return true;
  }
  return false;
};

