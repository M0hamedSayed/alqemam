/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, RequestHandler, Response } from 'express';
import { User } from '../common/config/db-config';
import { asyncHandler } from '../middlewares/asyncHandler';

import { generateOTP } from '../common/utils/generateOTP';
import config from '../common/config/env-config';
import { sendEmail } from '../common/utils/emailTransporter';
import { logger } from '../common/utils/logger';
import { signJWT } from '../common/utils/jwt';
import { IReqWithUser } from '../types';
import { ISignup, IUser } from '@alqemam/shared';

export const signupPost: RequestHandler = asyncHandler(
  async (req: IReqWithUser, _res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password, passwordConfirm, country, phoneNumber }: ISignup = req.body;

    const otp = generateOTP();
    const otpValidTo = new Date(new Date().getTime() + 60 * 60 * 1000 * 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      country,
      phoneNumber,
      otp,
      otpValidTo,
    });

    req.user = user.toJSON() as IUser;
    logger.info(user.email);
    next();
  },
);

export const sendVerificationEmail: RequestHandler = asyncHandler(
  async (req: IReqWithUser, res: Response, _next: NextFunction) => {
    const user = req.user;
    const link = `${config.frontUrl}/user/verify/${user.id}/${user.otp}`;
    //generate html code
    const html = `<h3 style="color:blue;">Hello, ${user.fullName}</h3>
        <p>E-mail verification was requested for this email address ${user.email}. If you requested this verification, click the link below :</p>
        <p>
        <p style="color:red;">This link is expired with in 12 hrs</p>
          <a style="background-color:blue; color:white;padding:10px 20px;text-decoration:none; font-weight:bold;border-radius:7px" href="${link}">Verify Your Email</a>
        </p>`;
    await sendEmail(user.email, 'Verify Email', html);

    res.status(201).json({
      message: 'Registration successful ,An Email sent to your account please verify',
      data: req.user,
      success: true,
    });
  },
);

export const sendWelcomeMailSocial: RequestHandler = asyncHandler(
  async (req: IReqWithUser, res: Response, _next: NextFunction) => {
    const user = req.user;
    const { id, email, fullName } = user;
    console.log(user);

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
      .status(301)
      .redirect(`${config.frontUrl}/task1`);
  },
);
