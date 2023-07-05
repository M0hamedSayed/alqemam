import * as https from 'https';
import * as http from 'http';
import { Application } from 'express';
import { logger } from '../utils/logger';
import { IServerOptions, FunctionLike } from '../../types';

export default class Server {
  server?: https.Server | http.Server;

  constructor(public app: Application, public options: IServerOptions) {}

  executeServer() {
    if (this.options.developmentMode) {
      return this.options.httpsInit ? this._httpsConfig() : this._httpConfig();
    } else {
      if (this.options.httpsInit)
        logger.info(
          `Self signed certs applied only on development or testing mode, Not ${process.env.NODE_ENV} Mode !!!`,
        );

      return this._httpConfig();
    }
  }

  serverListen(dbInitialize?: FunctionLike) {
    this.server = this.executeServer()?.listen(this.options.port, async () => {
      try {
        if (dbInitialize) {
          await dbInitialize();
        }

        logger.info(`Server Running On ${this.options.port}`);
      } catch (error: unknown) {
        logger.error(error as string);
        process.exit(1);
      }
    });
  }

  private _httpsConfig() {
    if (this.options.httpsInit)
      return https.createServer({ key: this.options.httpsInit.key, cert: this.options.httpsInit.cert }, this.app);
  }
  private _httpConfig() {
    return http.createServer(this.app);
  }
}
