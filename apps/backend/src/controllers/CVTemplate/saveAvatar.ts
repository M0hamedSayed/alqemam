import { NextFunction, Request, Response } from 'express';

export const saveAvatar = (req: Request, res: Response, _next: NextFunction) => {
  const img = req.file;
  // detect user id and delete img related to cv and save a new one

  // save img path , extension and name to DB

  res.status(201).json({
    success: true,
    message: 'user Info saved successfully',
    data: img,
  });
};
