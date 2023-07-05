import { Application, NextFunction, Request, Response } from 'express';
import { notFoundHandler } from '../../middlewares/notFoundHandler';
import { errorHandler } from '../../middlewares/errorHandler';
import authRoutes from '../../routes/authRoutes';

/**
 * @function
 * Registers all app routes
 *
 * @param {object} app - Express app.
 */

export default (app: Application) => {
  app.get('/health', (_request: Request, response: Response, _next: NextFunction) => {
    response.status(200).json({
      success: true,
      message: 'App is up & running.',
      data: null,
    });
  });

  app.use(authRoutes);

  // not found middleware
  app.use(notFoundHandler);

  // central error handler
  app.use(errorHandler);
};
