// =============================================
// API / Health Types
// =============================================
export interface HealthResponse {
  success: boolean;
  message?: string;
  data: {
    api: 'ok' | 'degraded' | 'down';
    database: 'ok' | 'error' | 'disconnected';
    blockchain: 'not_configured' | 'connected' | 'error';
    timestamp?: string;
  };
}

// =============================================
// Auth Types
// =============================================
export type UserRole = 'CITIZEN' | 'LRO' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  aadhaarId?: string;
  phone?: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// =============================================
// API Request / Response Shapes
// =============================================
export interface LoginRequest {
  email: string;
  password: string;
  role: UserRole;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  phone?: string;
  aadhaarId?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    tokens: AuthTokens;
  };
  error?: {
    code: string;
    details?: string[];
  };
}

// =============================================
// Form / UI Types
// =============================================
export interface FormFieldError {
  field: string;
  message: string;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}
