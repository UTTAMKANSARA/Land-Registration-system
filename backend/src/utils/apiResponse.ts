import { Response } from 'express';
import { ApiResponse } from '../types';

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200,
): Response {
  const payload: ApiResponse<T> = {
    success: true,
    ...(message && { message }),
    data,
  };
  return res.status(statusCode).json(payload);
}

export function sendError(
  res: Response,
  message: string,
  code = 'INTERNAL_SERVER_ERROR',
  statusCode = 500,
  details?: unknown[],
): Response {
  const payload: ApiResponse = {
    success: false,
    message,
    error: {
      code,
      ...(details && details.length > 0 && { details }),
    },
  };
  return res.status(statusCode).json(payload);
}
