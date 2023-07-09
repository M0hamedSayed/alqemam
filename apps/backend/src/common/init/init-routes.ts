import { Application } from 'express';
import { notFoundHandler } from '../../middlewares/notFoundHandler';
import { errorHandler } from '../../middlewares/errorHandler';
import authRoutes from '../../routes/authRoutes';
import { healthCheck } from '../../controllers/health';

/**
 * @function
 * Registers all app routes
 *
 * @param {object} app - Express app.
 */

export default (app: Application) => {
  app.get('/', healthCheck);

  app.get('/health', healthCheck);

  app.use(authRoutes);

  // not found middleware
  app.use(notFoundHandler);

  // central error handler
  app.use(errorHandler);
};
