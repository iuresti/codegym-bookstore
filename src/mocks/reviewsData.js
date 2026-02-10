// Mock data for reviews
export const reviewsData = {
  1: [ // Reviews for book 1 (El Quijote)
    {
      id: 1,
      bookId: 1,
      userId: 2,
      userName: 'Juan Cliente',
      rating: 5,
      title: 'Obra maestra',
      comment: 'Simplemente increíble. Una novela que cambia la perspectiva.',
      date: new Date('2024-01-15'),
      helpful: 12,
    },
    {
      id: 2,
      bookId: 1,
      userId: 3,
      userName: 'María García',
      rating: 4,
      title: 'Muy bueno',
      comment: 'Excelente narrativa, aunque algo larga.',
      date: new Date('2024-02-01'),
      helpful: 8,
    },
  ],
  2: [ // Reviews for book 2 (Cien años de soledad)
    {
      id: 3,
      bookId: 2,
      userId: 2,
      userName: 'Juan Cliente',
      rating: 5,
      title: 'Magistral',
      comment: 'García Márquez en su máxima expresión. Imprescindible.',
      date: new Date('2024-01-20'),
      helpful: 15,
    },
  ],
  8: [ // Reviews for book 8 (1984)
    {
      id: 4,
      bookId: 8,
      userId: 3,
      userName: 'María García',
      rating: 4,
      title: 'Distópico y adictivo',
      comment: 'Una novela que te hace pensar. Recomendado para todos.',
      date: new Date('2024-02-05'),
      helpful: 10,
    },
  ],
};

// Helper functions for review operations
export const getReviewsByBookId = (bookId) => {
  return reviewsData[bookId] || [];
};

export const getReviewById = (bookId, reviewId) => {
  const bookReviews = reviewsData[bookId] || [];
  return bookReviews.find(r => r.id === parseInt(reviewId));
};

export const addReview = (bookId, userId, userName, rating, title, comment) => {
  if (!reviewsData[bookId]) {
    reviewsData[bookId] = [];
  }

  const id = Math.max(...Object.values(reviewsData).flat().map(r => r.id), 0) + 1;
  const review = {
    id,
    bookId: parseInt(bookId),
    userId,
    userName,
    rating: parseInt(rating),
    title,
    comment,
    date: new Date(),
    helpful: 0,
  };

  reviewsData[bookId].push(review);
  return review;
};

export const updateReview = (bookId, reviewId, rating, title, comment) => {
  const bookReviews = reviewsData[bookId] || [];
  const review = bookReviews.find(r => r.id === parseInt(reviewId));

  if (review) {
    review.rating = parseInt(rating);
    review.title = title;
    review.comment = comment;
  }

  return review;
};

export const deleteReview = (bookId, reviewId) => {
  const bookReviews = reviewsData[bookId] || [];
  const index = bookReviews.findIndex(r => r.id === parseInt(reviewId));

  if (index !== -1) {
    bookReviews.splice(index, 1);
    return true;
  }

  return false;
};

export const getAverageRatingByBookId = (bookId) => {
  const reviews = getReviewsByBookId(bookId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

