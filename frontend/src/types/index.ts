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

export type UserRole = 'CITIZEN' | 'LRO' | 'ADMIN';
