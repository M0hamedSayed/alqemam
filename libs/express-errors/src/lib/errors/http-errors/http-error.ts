import { CustomError } from '../custom-error';

/**
 * @abstractClass
 *  create HTTP error inherit from CustomError Class
 *
 * @param {number} statusCode
 */

export abstract class HttpError extends CustomError {
  abstract statusCode: number;
}
