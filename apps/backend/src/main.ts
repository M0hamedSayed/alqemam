// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import LoadDependencies from './common/dependencies/LoadDependencies';
const { loadExpress, loadHelmet, loadCookieParser, loadDotEnv } = LoadDependencies.getInstance();
loadDotEnv().config();

import { Application, json, urlencoded } from 'express';
import Morgan from './middlewares/morgan';
import config from './common/config/env-config';
import Server from './common/init/server-init';
import { IServerOptions } from './types';
import { logger } from './common/utils/logger';
import { terminate } from './common/utils/gracefulShutdown';
import { AllowedOrigins } from './middlewares/allowedorigins';
import initializeRoutes from './common/init/init-routes';

// load all dependencies

//app
const app: Application = loadExpress<Application>();

// fils sys
import fs from 'fs';
import path from 'path';
import { connectDB } from './common/config/db-config';
import { init } from './common/utils/passport';

// secure headers with default helmet options
app.use(loadHelmet());

//detect development mode
const developmentMode: boolean = config.nodeEnv?.toLowerCase()?.includes('development');
logger.info(developmentMode);
// use morgan
const morgan = new Morgan({ developmentMode });
app.use(morgan.middleware());

//allowed origins
const allowedOrigins = new AllowedOrigins({
  origins: [
    'https://localhost:3000',
    'http://localhost:4200',
    'https://alqemam.hivespaces.org',
    'https://api-alqemam.hivespaces.org',
  ],
  credentials: true,
});
app.use(allowedOrigins.middleware());

//body parser
app.use(json());
app.use(urlencoded({ extended: true }));

//middleware for cookies
app.use(loadCookieParser());

//passport
app.use(init().initialize());

logger.info(`${__dirname}`);
// initialize server
const serverOptions: IServerOptions = {
  developmentMode,
  httpsInit: {
    key: fs.readFileSync(path.join(__dirname, './assets/certs/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, './assets/certs/cert.pem')),
  },
  port: config.app.port,
};

// server and db connection
const server = new Server(app, serverOptions);
server.serverListen(connectDB);

//initialize routes
initializeRoutes(app);

// graceful shutdown
const exitHandler = terminate(server.server);

process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));
