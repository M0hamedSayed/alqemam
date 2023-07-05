import { HttpError } from '@alqemam/express-errors';
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import Logger from '../common/utils/logger';

export const errorHandler: ErrorRequestHandler = (
  error: HttpError | Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  Logger.getInstance().logger.error(`${req.method} - ${error.message}  - ${req.originalUrl} - ${req.ip}`);
  const message = error instanceof HttpError ? error.serializedErrors() : error.message;
  const statusCode = error instanceof HttpError ? error.statusCode : 500;
  res.status(statusCode || 500).json({
    success: false,
    message: message || 'Internal Server Error',
    data: null,
  });
};
