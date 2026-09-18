import { Request, Response, NextFunction } from 'express';
import { sendError } from '../utils/apiResponse';

export function notFoundHandler(req: Request, res: Response, _next: NextFunction): void {
  sendError(res, `Resource not found: ${req.method} ${req.originalUrl}`, 'NOT_FOUND', 404);
}
