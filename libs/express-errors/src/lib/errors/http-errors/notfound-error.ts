import { HttpError } from './http-error';

export class NotFoundError extends HttpError {
  name = 'Not Found Error';
  statusCode = 404;
  constructor() {
    super('Source Not Found !!');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializedErrors() {
    return [{ message: 'Source Not Found !!' }];
  }
}
