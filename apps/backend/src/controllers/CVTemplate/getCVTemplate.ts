import { NextFunction, Request, Response } from 'express';
import { CVTemplate } from '../../common/config/db-config';

export const getCVTemplate = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.body;
  const cvTemplate = await CVTemplate.findByPk(id);
  if (cvTemplate) {
    res.status(201).json({
      success: true,
      message: 'Template returned successfully',
      data: cvTemplate.toJSON(),
    });
  } else {
    res.status(201).json({
      success: false,
      message: 'No data returned',
      data: null,
    });
  }
};
