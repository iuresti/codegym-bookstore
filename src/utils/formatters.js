// Format currency
export const formatCurrency = (value, currency = 'USD') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Format date
export const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

// Format date and time
export const formatDateTime = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// Format short date
export const formatShortDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
};

// Calculate days until expiration
export const daysUntilExpiration = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// Format time remaining
export const formatTimeRemaining = (expiryDate) => {
  const days = daysUntilExpiration(expiryDate);
  if (days === 0) return 'Expira hoy';
  if (days === 1) return 'Expira mañana';
  return `Expira en ${days} días`;
};

// Truncate text
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

// Format rating
export const formatRating = (rating) => {
  return parseFloat(rating).toFixed(1);
};

// Get rating percentage
export const getRatingPercentage = (rating) => {
  return Math.round((parseFloat(rating) / 5) * 100);
};

// Format number with decimals
export const formatNumber = (value, decimals = 2) => {
  return parseFloat(value).toFixed(decimals);
};

// Format large numbers
export const formatLargeNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Capitalize first letter
export const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Format title case
export const titleCase = (string) => {
  if (!string) return '';
  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

