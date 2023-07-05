import { NextFunction, Request, Response } from 'express';
import { ICors } from '../types';
import { CorsError } from '@alqemam/express-errors';
import { logger } from '../common/utils/logger';

export class AllowedOrigins {
  constructor(public options: ICors = { origins: '*', credentials: false }) {}

  middleware() {
    logger.info(this.options);
    return (req: Request, res: Response, next: NextFunction) => {
      const origin = req.headers.origin;
      if (!this.options.origins.includes(origin) && this.options.origins !== '*') {
        throw new CorsError();
      }
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.header('Access-Control-Allow-Credentials', `${this.options.credentials}`);
      next();
    };
  }
}
