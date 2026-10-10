const { HealthCheckService } = require('../services/healthCheckService');
const { sendSuccess } = require('../utils/apiResponse');

class HealthCheckController {
  static async checkStatus(_req, res, next) {
    try {
      const healthData = await HealthCheckService.getHealthStatus();
      sendSuccess(res, healthData, 'System health check completed successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = { HealthCheckController };
