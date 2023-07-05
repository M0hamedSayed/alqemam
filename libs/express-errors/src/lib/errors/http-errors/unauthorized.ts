import { HttpError } from './http-error';

export class Unauthorized extends HttpError {
  statusCode = 401;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, Unauthorized.prototype);
  }

  serializedErrors() {
    return [{ message: this.message }];
  }
}
