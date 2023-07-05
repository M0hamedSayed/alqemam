import { NextFunction, Request, RequestHandler, Response } from 'express';

export function asyncHandler(handler: RequestHandler) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(handler(req, res, next)).catch((err: Error) => {
      next(err);
    });
  };
}
