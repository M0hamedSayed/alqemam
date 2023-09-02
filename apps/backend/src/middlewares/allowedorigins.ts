import { NextFunction, Request, Response } from 'express';
import { ICors } from '../types';
import { CorsError } from '@alqemam/express-errors';
import { logger } from '../common/utils/logger';
import config from '../common/config/env-config';

export class AllowedOrigins {
  constructor(public options: ICors = { origins: '*', credentials: false }) {}

  middleware() {
    logger.info(this.options);
    return (req: Request, res: Response, next: NextFunction) => {
      const origin = req.headers.origin || config.baseUrl;
      if (!this.options.origins.includes(origin) && this.options.origins !== '*') {
        throw new CorsError();
      }
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');
      res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.header('Access-Control-Allow-Credentials', `${this.options.credentials}`);
      next();
    };
  }
}
