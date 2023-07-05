import { HttpError } from './http-error';

export class BadRequestError extends HttpError {
  statusCode = 400;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializedErrors() {
    return [{ message: this.message }];
  }
}
