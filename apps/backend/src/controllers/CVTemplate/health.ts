import { NextFunction, Request, Response } from 'express';

export const healthCheck = (_request: Request, response: Response, _next: NextFunction) => {
  response.status(200).json({
    success: true,
    message: 'App is up & running.',
    data: null,
  });
};
