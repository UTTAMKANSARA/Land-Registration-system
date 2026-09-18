import axios, { AxiosInstance } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor placeholder (for future JWT token injection)
apiClient.interceptors.request.use(
  (config) => {
    // Future: const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor placeholder (for future global error & auth refresh handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Future: handle 401 Unauthorized token refresh logic
    return Promise.reject(error);
  },
);

export async function fetchHealthCheck() {
  const response = await apiClient.get('/healthcheck/');
  return response.data;
}
