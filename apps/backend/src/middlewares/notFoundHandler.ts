import { NotFoundError } from '@alqemam/express-errors';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export const notFoundHandler: RequestHandler = (_req: Request, _res: Response, next: NextFunction) => {
  try {
    throw new NotFoundError();
  } catch (error: unknown) {
    next(error);
  }
};
