import { HttpError } from './http-error';

export class ForbiddenError extends HttpError {
  statusCode = 403;
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }

  serializedErrors() {
    return [{ message: this.message }];
  }
}
