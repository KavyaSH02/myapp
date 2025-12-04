const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? null // Force offline mode in production
    : 'http://localhost:5000');

console.log('API Base URL:', API_BASE_URL);

export default API_BASE_URL;