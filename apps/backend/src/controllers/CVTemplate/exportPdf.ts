/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import path from 'path';
import puppeteer from 'puppeteer';

export const exportPdf = async (_req: Request, res: Response, _next: NextFunction) => {
  // get id of user and cv id to get data from db
  const userInfo = {
    linkedinURL: 'https://www.linkedin.com/in/mohamed-sayed-13893a228/',
    mySiteURL: 'https://www.linkedin.com/in/mohamed-sayed-13893a228/',
    firstName: 'Mohamed',
    lastName: 'Sayed',
    phoneNumber: '+201005833382',
    country: 'Egypt',
    city: 'Fayoum',
    email: 'mohamed.sayed.atiaa@gmail.com',
    imgPath: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
  };
  const cvPath = 'http://localhost:3000/component/template1.js';
  console.log(cvPath);

  const { cv, cvName } = cvHtml(userInfo, cvPath, 'cv-template-1');
  console.log(cvName);

  const cvFile = await exportWebPageAsPdf(cv, cvName, userInfo);

  res.status(201).json({
    success: true,
    message: 'Template saved successfully',
    data: cvFile,
  });
};

const cvHtml = (info: any, cvPath: string, component: string) => {
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

  const cvName = path.join(__dirname, `../assets/components/${info.firstName}-${info.lastName}_CV.pdf`);
  return { cv, cvName };
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
