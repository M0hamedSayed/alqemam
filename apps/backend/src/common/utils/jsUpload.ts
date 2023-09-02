import { Request, RequestHandler } from 'express';
import multer from 'multer';
import { IReqWithUser } from '../../types';
import { BadRequestError } from '@alqemam/express-errors';

// customize storage
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: (error: Error, destination: string) => void) => {
    cb(null, './public/uploads');
  },
  filename: (_req: IReqWithUser, file: Express.Multer.File, cb: (error: Error, filename: string) => void) => {
    // const { user } = req;
    console.log(file);

    cb(null, file.originalname);
  },
});

const jsUpload = multer({
  storage,
  limits: {
    fileSize: 5000000, // 5MB
  },
  fileFilter(_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
    if (!file) return cb(null, true);
    if (!file.originalname.match(/\.(js|ts)/)) {
      return cb(new BadRequestError('please upload valid js file'));
    }
    cb(null, true);
  },
});

export const jsFile: RequestHandler = jsUpload.single('file');
