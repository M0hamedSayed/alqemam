import express, { Router } from 'express';
import {
  getCities_validate,
  getCountries_validate,
  saveUserInfo_validate,
  validateTemplateID,
} from '../validations/validationsMid';
import { validatorErrors } from '../middlewares/validatorErrors';
import { getCountries_post } from '../controllers/CVTemplate/getCountries';
import { asyncHandler } from '../middlewares/asyncHandler';
import { getCities_post } from '../controllers/CVTemplate/getCities';
import { createCVTemplate } from '../controllers/CVTemplate/createCVTemplate';
import { getCVTemplate } from '../controllers/CVTemplate/getCVTemplate';
import { saveUserInfo } from '../controllers/CVTemplate/saveUserInfo';
import { avatar } from '../common/utils/imageUpload';
import { saveAvatar } from '../controllers/CVTemplate/saveAvatar';
import { createCVTemplateWithJSFile } from '../controllers/CVTemplate/createCVTemplateWithJSFile';
import { jsFile } from '../common/utils/jsUpload';
import { exportPdf } from '../controllers/CVTemplate/exportPdf';

const cvRoutes: Router = express.Router();

cvRoutes.post('/get-countries', getCountries_validate, validatorErrors, asyncHandler(getCountries_post));
cvRoutes.post('/get-cities', getCities_validate, validatorErrors, asyncHandler(getCities_post));
cvRoutes.post('/save-cv', asyncHandler(createCVTemplate));
cvRoutes.post('/get-cv', validateTemplateID, validatorErrors, asyncHandler(getCVTemplate));
cvRoutes.post('/save-cv-info', saveUserInfo_validate, validatorErrors, asyncHandler(saveUserInfo));
cvRoutes.post('/upload-avatar', avatar, asyncHandler(saveAvatar));
cvRoutes.post('/save-cv-component', jsFile, asyncHandler(createCVTemplateWithJSFile));
cvRoutes.post('/export-pdf', asyncHandler(exportPdf));

export default cvRoutes;
