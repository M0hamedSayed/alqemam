import express, { Router } from 'express';
import { registerValidations } from '../validations/authValidatons';
import { validatorErrors } from '../middlewares/validatorErrors';
import { sendVerificationEmail, signupPost } from '../controllers/signup';
import { init } from '../common/utils/passport';
import config from '../common/config/env-config';
const authRouter: Router = express.Router();

authRouter.post('/signup', registerValidations, validatorErrors, signupPost, sendVerificationEmail);

// facebook auth
authRouter.get(
  '/auth/facebook',
  init().authenticate('facebook', {
    failureRedirect: `${config.baseUrl}/auth/failure`,
    scope: [
      'email',
      'public_profile',
      'user_location',
      'user_gender',
      'user_link',
      'user_birthday',
      'user_age_range',
      'user_hometown',
    ],
  }),
);

//facebook auth callback
authRouter.get(
  '/auth/facebook/callback',
  init().authenticate('facebook', {
    session: false,
  }),
);

export default authRouter;
