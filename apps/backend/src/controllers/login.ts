import { NextFunction, Request, RequestHandler, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { ILogin } from '@alqemam/shared';
import { User } from '../common/config/db-config';
import { BadRequestError, ForbiddenError } from '@alqemam/express-errors';
import { IReqWithUser } from '../types';
import { signJWT } from '../common/utils/jwt';
import { sendEmail } from '../common/utils/emailTransporter';

export const loginPost: RequestHandler = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) throw new BadRequestError('Email is not exist, please signup');
  if (!user.toJSON().emailVerified) throw new BadRequestError('Your account not verified , please verify it');

  /**
   * @password
   * if not match
   * else if user sign with social media
   * else success
   */
  const checkPasswordMatch = await user.comparePassword(password);
  if (!checkPasswordMatch) throw new BadRequestError('Invalid password');
  if (checkPasswordMatch === 1)
    throw new BadRequestError(
      'you registered by social media , please, login with google or facebook account or reset your password',
    );

  req.user = user;
  next();
});

export const logoutGet: RequestHandler = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  res
    .clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' })
    .status(200)
    .json({ data: null, success: true, message: 'logout success' });
});

export const sendWelcomeMail: RequestHandler = asyncHandler(
  async (req: IReqWithUser, res: Response, _next: NextFunction) => {
    const user = req.user;
    const { id, email, fullName } = user;
    const accessToken = signJWT({ id, email, fullName }, '3d');
    let html = '';
    if (user.firstRegistration) {
      html = `<h3 style="color:blue;">Hello, ${user.fullName}</h3>
                <h4>Welcome</h4>
                <p>Thanks for signing up with us to use HiveSpace</p>`;
    } else {
      html = `<h3 style="color:blue;">Hello, ${user.fullName}</h3>
                <h4>Welcome Back </h4>
                <p>Make yourself at home</p>`;
    }
    await sendEmail(user.email, 'welcome email', html);

    res
      .cookie('jwt', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ success: true, data: user, message: 'login success' });
  },
);

export const emailVerify: RequestHandler = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const user = await User.findByPk(req.params.id);
  if (!user) throw new ForbiddenError('Invalid Link');
  if (user.toJSON().emailVerified) {
    throw new ForbiddenError('this user is already verified, Invalid Link');
  }
  const { otp, otpValidTo } = user.toJSON();
  const now = new Date().getTime();
  if (otp != req.params.otp || otpValidTo - now <= 0) {
    throw new ForbiddenError('Invalid Link');
  }

  user.set({ ...user, emailVerified: true });
  await user.save({ validate: false });
  res.status(200).json({ message: 'mail verified success', success: true, data: null });
});
