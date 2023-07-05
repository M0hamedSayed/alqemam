import { CustomError } from './custom-error';
/**
 * @class
 * generate error if packages not installed inherit from customError Abstract Class
 *
 * @param {string} packageName
 */

export class PackageError extends CustomError {
  // constructor
  constructor(public packageName: string) {
    super(`${packageName} was not installed , Try install it : pnpm add ${packageName} `);
    Object.setPrototypeOf(this, PackageError.prototype);
  }

  serializedErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: `${this.packageName} was not installed , Try install it : pnpm add ${this.packageName} ` }];
  }
}
