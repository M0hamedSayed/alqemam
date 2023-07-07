import { NextFunction, Request, RequestHandler, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { BadRequestError } from '@alqemam/express-errors';
import { verifyJWT } from '../common/utils/jwt';

export const validateToken: RequestHandler = asyncHandler(async (req: Request, res: Response, _next: NextFunction) => {
  const cookies = req.cookies;
  if (!cookies.jwt) throw new BadRequestError('Invalid Token');

  const accessToken = cookies.jwt;
  const { payload, expired } = verifyJWT(accessToken);
  if (expired) {
    res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none' });
    throw new BadRequestError('Token Expired');
  }
  res.status(200).json({ message: 'Token verified', data: payload, success: true });
});
