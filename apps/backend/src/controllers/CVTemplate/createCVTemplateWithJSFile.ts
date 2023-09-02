/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForbiddenError } from '@alqemam/express-errors';
import { NextFunction, Request, Response } from 'express';
import { CVTemplate } from '../../common/config/db-config';
import config from '../../common/config/env-config';

export const createCVTemplateWithJSFile = async (req: Request, res: Response, _next: NextFunction) => {
  const jsFile = (req as any).file;
  const componentName = (req as any).body.componentName;
  if (!componentName) throw new ForbiddenError('component name required !!');
  if (!jsFile) throw new ForbiddenError('file is missed !!');
  const cvTemplate = await CVTemplate.findOrCreate({
    where: { name: componentName },
    defaults: {
      name: componentName,
      type: 'free',
      content: `${config.baseUrl}/elements/${jsFile.originalname}`,
    },
  });
  res.status(201).json({
    success: true,
    message: 'Template saved successfully',
    data: cvTemplate,
  });
};
