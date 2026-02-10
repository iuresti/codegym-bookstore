import { VALIDATION } from './constants';

export const validateEmail = (email) => {
  return VALIDATION.EMAIL_PATTERN.test(email);
};

export const validatePassword = (password) => {
  return password.length >= VALIDATION.PASSWORD_MIN_LENGTH;
};

export const validateLogin = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = 'El email es requerido';
  } else if (!validateEmail(email)) {
    errors.email = 'El email no es válido';
  }

  if (!password) {
    errors.password = 'La contraseña es requerida';
  } else if (!validatePassword(password)) {
    errors.password = `La contraseña debe tener al menos ${VALIDATION.PASSWORD_MIN_LENGTH} caracteres`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateReview = (rating, title, comment) => {
  const errors = {};

  if (!rating || rating < VALIDATION.MIN_RATING || rating > VALIDATION.MAX_RATING) {
    errors.rating = `La calificación debe estar entre ${VALIDATION.MIN_RATING} y ${VALIDATION.MAX_RATING}`;
  }

  if (!title || title.trim().length === 0) {
    errors.title = 'El título es requerido';
  }

  if (!comment || comment.length < VALIDATION.REVIEW_MIN_LENGTH) {
    errors.comment = `El comentario debe tener al menos ${VALIDATION.REVIEW_MIN_LENGTH} caracteres`;
  } else if (comment.length > VALIDATION.REVIEW_MAX_LENGTH) {
    errors.comment = `El comentario no puede exceder ${VALIDATION.REVIEW_MAX_LENGTH} caracteres`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateBookForm = (data) => {
  const errors = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'El título es requerido';
  }

  if (!data.author || data.author.trim().length === 0) {
    errors.author = 'El autor es requerido';
  }

  if (!data.genre || data.genre.trim().length === 0) {
    errors.genre = 'El género es requerido';
  }

  if (!data.price || parseFloat(data.price) <= 0) {
    errors.price = 'El precio debe ser mayor a 0';
  }

  if (!data.stock || parseInt(data.stock) < 0) {
    errors.stock = 'El stock debe ser mayor o igual a 0';
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'La descripción es requerida';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateBookRequestForm = (data) => {
  const errors = {};

  if (!data.bookTitle || data.bookTitle.trim().length === 0) {
    errors.bookTitle = 'El título del libro es requerido';
  }

  if (!data.author || data.author.trim().length === 0) {
    errors.author = 'El autor es requerido';
  }

  if (!data.genre || data.genre.trim().length === 0) {
    errors.genre = 'El género es requerido';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validatePromotionForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'El nombre es requerido';
  }

  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'La descripción es requerida';
  }

  if (!data.discountPercentage || parseFloat(data.discountPercentage) <= 0 || parseFloat(data.discountPercentage) > 100) {
    errors.discountPercentage = 'El descuento debe estar entre 1 y 100%';
  }

  if (!data.startDate) {
    errors.startDate = 'La fecha de inicio es requerida';
  }

  if (!data.endDate) {
    errors.endDate = 'La fecha de término es requerida';
  }

  if (data.startDate && data.endDate && new Date(data.startDate) >= new Date(data.endDate)) {
    errors.endDate = 'La fecha de término debe ser posterior a la fecha de inicio';
  }

  if (data.bookIds && data.bookIds.length === 0) {
    errors.bookIds = 'Debe seleccionar al menos un libro';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

