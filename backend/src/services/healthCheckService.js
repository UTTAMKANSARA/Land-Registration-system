const { checkDatabaseConnection } = require('../database/prisma');

class HealthCheckService {
  static async getHealthStatus() {
    const isDbConnected = await checkDatabaseConnection();

    return {
      api: 'ok',
      database: isDbConnected ? 'ok' : 'error',
      blockchain: 'not_configured',
      timestamp: new Date().toISOString(),
    };
  }
}

module.exports = { HealthCheckService };
