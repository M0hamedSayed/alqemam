import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ValidationsErrors } from '@alqemam/express-errors';

export const validatorErrors = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationsErrors(errors.array());
  }
  next();
}; //handle express validator error
