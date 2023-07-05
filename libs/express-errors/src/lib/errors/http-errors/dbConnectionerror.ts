import { HttpError } from './http-error';

export class DbConnectionError extends HttpError {
  statusCode = 401;
  constructor(public message: string) {
    super('Error connecting to db' + message);
    Object.setPrototypeOf(this, DbConnectionError.prototype);
  }

  serializedErrors() {
    return [{ message: 'Error connecting to db ' + this.message }];
  }
}
