import axios from 'axios';

/**
 * Configured Axios instance with sensible defaults,
 * request/response interceptors, and standard error handling.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach authentication token & request headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Format responses and handle global errors
apiClient.interceptors.response.use(
  (response) => {
    // Return response body directly for cleaner caller syntax
    return response.data;
  },
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.message || 'An unexpected error occurred',
      status: error.response?.status || null,
      data: error.response?.data || null,
      originalError: error,
    };

    // Global HTTP error status handling
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized: Clear token if session expired
          console.warn('[API Client] 401 Unauthorized - redirecting or clearing auth');
          break;
        case 403:
          console.warn('[API Client] 403 Forbidden - access denied');
          break;
        case 404:
          console.warn('[API Client] 404 Not Found - resource does not exist');
          break;
        case 500:
        case 502:
        case 503:
          console.error('[API Client] Server Error:', customError.message);
          break;
        default:
          break;
      }
    } else if (error.request) {
      // Network error or timeout
      customError.message = 'Network error: unable to reach the server. Please check your connection.';
      console.error('[API Client] Network / Connection Error:', customError.message);
    }

    return Promise.reject(customError);
  }
);

export default apiClient;

