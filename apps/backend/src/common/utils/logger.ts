import * as Winston from 'winston';
import LoadDependencies from '../dependencies/LoadDependencies';

const winston: typeof Winston = LoadDependencies.getInstance().loadWinston();

export default class Logger {
  // eslint-disable-next-line no-use-before-define
  private static _instance: Logger;
  public static developmentMode = true;
  public static files = { all: 'all.log', error: 'error.log' };
  public static format = 'combined';

  // Define different colors for each level.
  colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  };

  // Define your severity levels..
  private _levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  };

  constructor() {
    /**
     * Tell winston that you want to link the colors
     * defined above to the severity levels.
     */

    winston.addColors(this.colors);
  }

  /**
   * singleton pattern
   */
  public static getInstance() {
    if (!Logger._instance) {
      Logger._instance = new Logger();
    }
    return Logger._instance;
  }

  /**
   *  if the server was run in development mode; otherwise,
   *   if it was run in production, show only warn and error messages.
   */
  private _level() {
    return Logger.developmentMode ? 'debug' : 'warn';
  }

  // Chose the aspect of your log customizing the log format.
  private _format = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    // Tell Winston that the logs must be colored
    winston.format.colorize({ all: true }),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf((info: Winston.Logform.TransformableInfo) => `${info.timestamp}  :  ${info.message}`),
  );

  /**
   * Define which transports the logger must use to print out messages.
   * In this example, we are using three different transports
   */
  private _transports = [
    // Allow the use the console to print the messages
    new winston.transports.Console(),
    // Allow to print all the error level messages inside the error.log file
    new winston.transports.File({
      filename: `${Logger.files?.error || 'error.log'}`,
      level: 'error',
    }),

    // Allow to print all the error message inside the all.log file
    // (also the error log that are also printed inside the error.log(
    new winston.transports.File({ filename: `${Logger.files?.all || 'all.log'}` }),
  ];

  /**
   * Create the logger instance that has to be exported
   * and used to log messages.
   */
  logger = winston.createLogger({
    level: this._level(),
    levels: this._levels,
    format: this._format,
    transports: this._transports,
  });
}

export const logger = Logger.getInstance().logger;
