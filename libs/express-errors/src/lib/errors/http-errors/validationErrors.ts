/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpError } from './http-error';
import { ValidationError } from 'express-validator';

export class ValidationsErrors extends HttpError {
  statusCode = 422;
  constructor(public errors: ValidationError[]) {
    super('Validation Error');
    Object.setPrototypeOf(this, ValidationsErrors.prototype);
  }

  serializedErrors() {
    return this.errors.map((err: ValidationError) => {
      return { message: err.msg, name: 'Validation' };
    });
  }
}
