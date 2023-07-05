/**
 * @abstractClass
 *  create custom error inherit from Error Class
 *
 * @param {string} message
 */

export abstract class CustomError extends Error {
  constructor(public message: string) {
    super(message);

    //Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializedErrors(): { message: string; field?: string }[];
}
