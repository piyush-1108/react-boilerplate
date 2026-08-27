import { useState, useCallback } from 'react';
import apiClient from '../api/client';

/**
 * Simplified React hook for making API calls with loading & error states.
 *
 * @returns {{
 *   request: (url: string, config?: object) => Promise<any>,
 *   loading: boolean,
 *   error: object|null,
 *   data: any,
 *   setData: Function
 * }}
 *
 * @example
 * // 1. GET Request
 * const { request, loading, error, data } = useApi();
 * const fetchUsers = () => request('/users');
 *
 * @example
 * // 2. POST / PUT / PATCH / DELETE Request
 * const { request, loading } = useApi();
 * const createUser = (formData) => request('/users', { method: 'POST', data: formData });
 * const deleteUser = (id) => request(`/users/${id}`, { method: 'DELETE' });
 *
 * @example
 * // 3. File Upload / FormData
 * const formData = new FormData();
 * formData.append('avatar', file);
 * const uploadAvatar = () => request('/upload', { method: 'POST', data: formData });
 */
export function useApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient({
        url,
        method: config.method || 'GET',
        ...config,
      });
      setData(response);
      return response;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error, data, setData };
}

export default useApi;
