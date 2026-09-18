import { Request, Response, NextFunction } from 'express';
import { HealthCheckService } from '../services/healthCheckService';
import { sendSuccess } from '../utils/apiResponse';

export class HealthCheckController {
  public static async checkStatus(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const healthData = await HealthCheckService.getHealthStatus();
      sendSuccess(res, healthData, 'System health check completed successfully');
    } catch (error) {
      next(error);
    }
  }
}
