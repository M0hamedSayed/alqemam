import express, { Router } from 'express';
import { loginValidations, registerValidations } from '../validations/authValidatons';
import { validatorErrors } from '../middlewares/validatorErrors';
import { sendVerificationEmail, sendWelcomeMailSocial, signupPost } from '../controllers/signup';
import { init } from '../common/utils/passport';
import config from '../common/config/env-config';
import { emailVerify, loginPost, logoutGet, sendWelcomeMail } from '../controllers/login';
import { validateToken } from '../controllers/validateToken';
const authRouter: Router = express.Router();

authRouter.post('/signup', registerValidations, validatorErrors, signupPost, sendVerificationEmail);
authRouter.post('/login', loginValidations, validatorErrors, loginPost, sendWelcomeMail);
authRouter.get('/user/verify/:id/:otp', emailVerify);
authRouter.get('/me', validateToken);
authRouter.get('/logout', logoutGet);

// facebook auth
authRouter.get(
  '/auth/facebook',
  init().authenticate('facebook', {
    failureRedirect: `${config.baseUrl}/auth/failure`,
    successRedirect: `${config.frontUrl}/auth/success`,
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
  sendWelcomeMailSocial,
);

export default authRouter;
