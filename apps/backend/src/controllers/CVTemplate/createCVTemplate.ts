import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '@alqemam/express-errors';
import { CVTemplate } from './../../common/config/db-config';
import Logger from './../../common/utils/logger';

export const createCVTemplate = async (req: Request, res: Response, _next: NextFunction) => {
  // eslint-disable-next-line prefer-const
  let { name, type, content } = req.body;
  if (!name && !content) {
    throw new BadRequestError(' name and content must provided');
  }
  if (!type) type = 'free';

  const cvTemplate = await CVTemplate.create({ name, type, content });
  Logger.getInstance().logger.info(cvTemplate.toJSON());

  res.status(201).json({
    success: true,
    message: 'Template saved successfully',
    data: cvTemplate.toJSON(),
  });
};
