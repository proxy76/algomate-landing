// API base URL - reads from Vite environment variable, falls back to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export default API_BASE_URL;
