import { ForbiddenError } from '@alqemam/express-errors';
import { logger } from '../common/utils/logger';

//validate password
export const handlePassErrors = (password: string, passwordConfirm: string) => {
  if (password && passwordConfirm) {
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
      throw new ForbiddenError(
        'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.',
      );
    }
    if (password !== passwordConfirm) {
      throw new ForbiddenError("Two Passwords doesn't Match.");
    }
  } else {
    logger.info('test' + password + passwordConfirm);
    throw new ForbiddenError('Two passwords fields required');
  }
};
