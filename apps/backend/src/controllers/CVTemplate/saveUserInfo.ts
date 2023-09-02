/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { CVTemplate, UserInfo } from '../../common/config/db-config';
import { BadRequestError } from '@alqemam/express-errors';

export const saveUserInfo = async (req: Request, res: Response, _next: NextFunction) => {
  const { firstName, lastName, email, phoneNumber, linkedinURL, website, cityID, cvTemplateID } = req.body;

  const userInfo = await UserInfo.create({
    first_name: firstName,
    last_name: lastName,
    email,
    phone_number: phoneNumber,
    linkedin_URL: linkedinURL,
    website,
    city_id: cityID,
  });
  // insert into Training.users ('first_name','last_name','email','phone_number','linkedin_URL','website',''city_id) values ()
  // select id from Training.cv_templates where id === ''
  // insert into Training.cv_users (user_id,cv_id) values ()

  const cvTemplate = await CVTemplate.findByPk(cvTemplateID);
  if (!cvTemplate) throw new BadRequestError('cv template is not defined');

  await userInfo.addCVTemplate(cvTemplate);

  res.status(201).json({
    success: true,
    message: 'user Info saved successfully',
    data: '',
  });
};
