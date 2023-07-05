import { HttpError } from './http-error';

export class CorsError extends HttpError {
  statusCode = 403;
  constructor() {
    super('Not Allowed By Cors');
    Object.setPrototypeOf(this, CorsError.prototype);
  }

  serializedErrors() {
    return [{ message: 'Not Allowed By Cors' }];
  }
}
