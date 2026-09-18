import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';
import { config } from '../config';

export function errorHandler(
  err: Error & { statusCode?: number; status?: number; code?: string },
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'An unexpected error occurred';
  const code = err.code || 'INTERNAL_SERVER_ERROR';

  const details = config.nodeEnv === 'development' && err.stack ? [err.stack] : undefined;

  sendError(res, message, code, statusCode, details);
}
