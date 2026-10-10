import axios, { AxiosInstance } from 'axios';
import type { AuthResponse, LoginRequest, SignupRequest } from '../types';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Request interceptor — inject JWT when available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('elr_access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — handle global errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: handle 401 → token refresh flow
    return Promise.reject(error);
  },
);

// =============================================
// Health Check
// =============================================
export async function fetchHealthCheck() {
  const response = await apiClient.get('/v1/healthcheck');
  return response.data;
}

// =============================================
// MOCK AUTH — simulates backend responses
// Replace these with real API calls once backend auth is ready.
// =============================================

export async function login(payload: LoginRequest): Promise<AuthResponse> {
  try {
    const response = await apiClient.post('/auth/login', {
      identifier: payload.email,
      password: payload.password,
    });

    const { token, user, message } = response.data;

    const mappedUser = {
      id: user.id,
      email: user.email,
      fullName: user.name,
      role: user.role,
      phone: user.mobile,
      createdAt: user.createdAt || new Date().toISOString(),
    };

    const tokens = {
      accessToken: token,
      refreshToken: '', // Will add refresh token logic in backend later
    };

    localStorage.setItem('elr_access_token', tokens.accessToken);
    localStorage.setItem('elr_user', JSON.stringify(mappedUser));

    return {
      success: true,
      message: message || 'Login successful',
      data: { user: mappedUser, tokens },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed. Please try again.',
      error: { code: 'LOGIN_FAILED' },
    };
  }
}

export async function signup(payload: SignupRequest): Promise<AuthResponse> {
  try {
    const response = await apiClient.post('/auth/register', {
      name: payload.fullName,
      email: payload.email,
      mobile: payload.phone || `99${Math.floor(10000000 + Math.random() * 90000000)}`, 
      aadhaar: payload.aadhaarId || `${Math.floor(100000000000 + Math.random() * 900000000000)}`, 
      password: payload.password,
    });

    // Backend register doesn't log the user in immediately, so we do it manually
    const loginRes = await apiClient.post('/auth/login', {
      identifier: payload.email,
      password: payload.password,
    });

    const token = loginRes.data.token;
    const user = response.data.user;

    const mappedUser = {
      id: user.id,
      email: user.email,
      fullName: user.name,
      role: user.role,
      phone: user.mobile,
      createdAt: user.createdAt || new Date().toISOString(),
    };

    const tokens = {
      accessToken: token,
      refreshToken: '',
    };

    localStorage.setItem('elr_access_token', tokens.accessToken);
    localStorage.setItem('elr_user', JSON.stringify(mappedUser));

    return {
      success: true,
      message: response.data.message || 'Account created successfully!',
      data: { user: mappedUser, tokens },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed. Please try again.',
      error: { code: 'REGISTRATION_FAILED' },
    };
  }
}

export function logout(): void {
  localStorage.removeItem('elr_access_token');
  localStorage.removeItem('elr_refresh_token');
  localStorage.removeItem('elr_user');
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem('elr_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem('elr_access_token');
}
