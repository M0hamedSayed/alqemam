import { NextFunction, Request, Response } from 'express';
import { CVTemplate } from '../../common/config/db-config';

export const getAllCv = async (_req: Request, res: Response, _next: NextFunction) => {
  const cvTemplate = await CVTemplate.findAll();
  if (cvTemplate) {
    res.status(201).json({
      success: true,
      message: 'Template returned successfully',
      data: cvTemplate,
    });
  } else {
    res.status(201).json({
      success: false,
      message: 'No data returned',
      data: null,
    });
  }
};
