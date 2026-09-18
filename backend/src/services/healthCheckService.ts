import { checkDatabaseConnection } from '../database/prisma';
import { HealthCheckData } from '../types';

export class HealthCheckService {
  public static async getHealthStatus(): Promise<HealthCheckData> {
    const isDbConnected = await checkDatabaseConnection();

    return {
      api: 'ok',
      database: isDbConnected ? 'ok' : 'error',
      blockchain: 'not_configured',
      timestamp: new Date().toISOString(),
    };
  }
}
