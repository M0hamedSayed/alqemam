/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from './logger';
import { closeConnection } from '../config/db-config';

export const terminate = (
  server: any,
  options: { coreDump: boolean; timeout: number } = { coreDump: false, timeout: 500 },
) => {
  // Exit function
  const exit = (code: number) => {
    options.coreDump ? process.abort() : process.exit(code);
  };

  return (_code: number, _reason: unknown) => async (error: Error) => {
    if (error && error instanceof Error) {
      logger.error(error);
    }
    await closeConnection();
    // Attempt a graceful shutdown
    server.close(exit);

    setTimeout(exit, options.timeout); // Prevents the timeout from registering on event loop
  };
};
