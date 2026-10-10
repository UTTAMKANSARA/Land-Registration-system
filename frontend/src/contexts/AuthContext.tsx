import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { AuthState, LoginRequest, SignupRequest, User } from '../types';
import { getStoredUser, isAuthenticated, login as apiLogin, logout as apiLogout, signup as apiSignup } from '../services/api';
import { useToast } from './ToastContext';

interface AuthContextValue extends AuthState {
  login: (payload: LoginRequest) => Promise<boolean>;
  signup: (payload: SignupRequest) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToast } = useToast();

  const [state, setState] = useState<AuthState>({
    user: null,
    tokens: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Restore session from localStorage on mount
  useEffect(() => {
    if (isAuthenticated()) {
      const user: User | null = getStoredUser();
      setState({
        user,
        tokens: {
          accessToken: localStorage.getItem('elr_access_token') || '',
          refreshToken: localStorage.getItem('elr_refresh_token') || '',
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (payload: LoginRequest): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await apiLogin(payload);
      if (res.success && res.data) {
        setState({
          user: res.data.user,
          tokens: res.data.tokens,
          isAuthenticated: true,
          isLoading: false,
        });
        addToast('success', 'Welcome back!', res.message);
        return true;
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
        addToast('error', 'Login failed', res.message);
        return false;
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
      addToast('error', 'Login failed', 'An unexpected error occurred. Please try again.');
      return false;
    }
  }, [addToast]);

  const signup = useCallback(async (payload: SignupRequest): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await apiSignup(payload);
      if (res.success && res.data) {
        setState({
          user: res.data.user,
          tokens: res.data.tokens,
          isAuthenticated: true,
          isLoading: false,
        });
        addToast('success', 'Account created!', res.message);
        return true;
      } else {
        setState((prev) => ({ ...prev, isLoading: false }));
        addToast('error', 'Signup failed', res.message);
        return false;
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }));
      addToast('error', 'Signup failed', 'An unexpected error occurred. Please try again.');
      return false;
    }
  }, [addToast]);

  const logout = useCallback(() => {
    apiLogout();
    setState({ user: null, tokens: null, isAuthenticated: false, isLoading: false });
    addToast('info', 'Signed out', 'You have been successfully signed out.');
  }, [addToast]);

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
