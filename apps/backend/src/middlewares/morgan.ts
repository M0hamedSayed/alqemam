import { RequestHandler } from 'express';
import Logger from '../common/utils/logger';
import IMorganOptions from '../types/interfaces/IMorganOptions';
import LoadDependencies from '../common/dependencies/LoadDependencies';

/**
 * @class
 * apply morgan middlewares with options
 * @param {object} options {developmentMode: boolean , files :{all:string , error : string } , format : string}
 *
 * @example new Morgan({developmentMode : true , files : {all:all.log , error : error.log } , format : 'tiny'})
 */

export default class Morgan {
  private _logger = Logger.getInstance();
  private _morgan = LoadDependencies.getInstance().loadMorgan();

  constructor(public options?: IMorganOptions) {
    this._initializeOptions();
  }

  private _initializeOptions() {
    const { developmentMode, files, format } = this.options;
    Object.assign(
      Logger,
      developmentMode !== undefined && { developmentMode },
      files !== undefined && { files },
      format !== undefined && { format },
    );
  }

  middleware(): RequestHandler {
    const stream = {
      write: (message: string) => this._logger.logger.http(message),
    };
    const format = Logger.format;
    const skip = () => Logger.developmentMode;

    return this._morgan(format, { stream, skip });
  }
}
