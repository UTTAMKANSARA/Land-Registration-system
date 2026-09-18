export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    details?: unknown[];
  };
}

export interface HealthCheckData {
  api: 'ok' | 'degraded' | 'down';
  database: 'ok' | 'error' | 'disconnected';
  blockchain: 'not_configured' | 'connected' | 'error';
  timestamp?: string;
}
