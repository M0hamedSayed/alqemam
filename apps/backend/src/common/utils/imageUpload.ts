/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { IReqWithUser } from '../../types';
import { BadRequestError } from '@alqemam/express-errors';
import { RequestHandler } from 'express';

// customize storage
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error, destination: string) => void) => {
    cb(null, '/usr/src/app/public/uploads');
  },
  filename: (_req: IReqWithUser, file: Express.Multer.File, cb: (error: Error, filename: string) => void) => {
    // const { user } = req;
    cb(null, 'cv-avatar_' + Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage,
  limits: {
    fileSize: 5000000, // 5MB
  },
  fileFilter(_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    console.log(file);

    if (!file) return cb(null, true);
    if (!file.originalname.match(/\.(png|jpg)/)) {
      return cb(new BadRequestError('please upload image with png or jpg extension'));
    }
    cb(null, true);
  },
});

export const avatar: RequestHandler = imageUpload.single('cvAvatar');
