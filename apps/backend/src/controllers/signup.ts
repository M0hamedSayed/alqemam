/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { User } from '../common/config/db-config';
import { asyncHandler } from '../middlewares/asyncHandler';

import { generateOTP } from '../common/utils/generateOTP';
import config from '../common/config/env-config';
import { sendEmail } from '../common/utils/emailTransporter';
import { logger } from '../common/utils/logger';

interface ISignup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  country: string;
  phoneNumber: string | number;
}

interface IUser {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string | number;
  country: string;
  otp: string;
  firstName: string;
  lastName: string;
  otpValidTo: Date;
  emailVerified: boolean;
  firstRegistration: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IReqWithUser extends Request {
  user: IUser;
}

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

    logger.info(user.toJSON());

    req.user = user.toJSON() as IUser;
    logger.info(user.email);

    // req.user = { ...user.userData() };

    next();
  },
);

export const sendVerificationEmail: RequestHandler = asyncHandler(
  async (req: IReqWithUser, res: Response, _next: NextFunction) => {
    const user = req.user;
    logger.info(user);

    const link = `${config.frontUrl}/user/verify/${user.id}/${user.otp}`;
    //generate html code
    const html = `<h3 style="color:blue;">Hello, ${user.fullName}</h3>
        <p>E-mail verification was requested for this email address ${user.email}. If you requested this verification, click the link below :</p>
        <p>
        <p style="color:red;">This link is expired with in 12 hrs</p>
          <a style="background-color:blue; color:white;padding:10px 20px;text-decoration:none; font-weight:bold;border-radius:7px" href="${link}">Verify Your Email</a>
        </p>`;
    await sendEmail(user.email, 'Verify Email', html);

    res
      .status(201)
      .json({ message: 'Registration successful ,An Email sent to your account please verify', user: req.user });
  },
);
