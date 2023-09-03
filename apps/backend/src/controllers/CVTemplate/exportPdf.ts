/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import puppeteer from 'puppeteer';
import { CVTemplate, Cities, Countries, User, UserImgs, UserInfo } from '../../common/config/db-config';
import { Op } from 'sequelize';

export const exportPdf = async (req: Request, res: Response, _next: NextFunction) => {
  // get id of user and cv id to get data from db
  const { payload } = req as any;
  const { cvTemplateID } = req.body;
  const userID = payload.id;
  const userBase = await User.findByPk(userID, {
    include: [{ model: UserInfo, attributes: ['id'] }],
  });
  const jsonUser = userBase.toJSON();
  console.log(jsonUser);

  const user = await UserInfo.findByPk(jsonUser.users.id, {
    include: [
      {
        model: Cities,
        attributes: ['id', 'name', 'country_code'],
        include: [{ model: Countries, attributes: ['name'] }],
      },
      {
        model: UserImgs,
        where: { name: { [Op.like]: `%cv` } },
        attributes: ['path'],
        limit: 1,
        order: [['createdAt', 'DESC']],
      },
      { model: CVTemplate, where: { id: cvTemplateID }, attributes: ['name', 'content'] },
    ],
  });
  const userData = user.toJSON();
  const userInfo = {
    linkedinURL: userData.linkedin_URL,
    mySiteURL: userData.linkedin_URL,
    firstName: userData.first_name,
    lastName: userData.last_name,
    phoneNumber: userData.phone_number,
    country: userData?.city?.Country?.name,
    city: userData?.city?.name,
    email: userData.email,
    imgPath: userData?.['user-imgs'][0]?.path || 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
  };
  const cvPath = userData.CVTemplates[0].content;
  const cvName = `./public/uploads/${userInfo.firstName}-${userInfo.lastName}-${userData.id}_CV.pdf`;

  const cv = cvHtml(cvPath, userData.CVTemplates[0].name);
  console.log(cvName);

  const cvFile = await exportWebPageAsPdf(cv, cvName, userInfo);

  res.status(201).json({
    success: true,
    message: 'Template saved successfully',
    data: cvFile,
  });
};

const cvHtml = (cvPath: string, component: string) => {
  const cv = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>cv-templates</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://unpkg.com/tailwindcss-jit-cdn"></script>
    
</head>
<body>
    <${component}></${component}>
    <script src="${cvPath}" ></script>
</body>
</html>
`;

  return cv;
};
const exportWebPageAsPdf = async (html: string, filePath: string, info: any) => {
  const browser = await puppeteer.launch({ headless: false, args: ['--disable-features=site-per-process'] });
  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: 'domcontentloaded' });

  await page.waitForSelector('cv-template-1');
  await page.addScriptTag({
    content: `document.querySelector('cv-template-1').setAttribute('info','${JSON.stringify(info)}')`,
  });
  //To reflect CSS used for screens instead of print
  await page.emulateMediaFeatures();
  await page.emulateMediaType('screen');
  // Download the PDF
  const pdf = await page.pdf({
    path: filePath,
    printBackground: true,
    format: 'A4',
    landscape: true,
  });

  await browser.close();
  return pdf;
};
