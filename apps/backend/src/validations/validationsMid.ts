/* eslint-disable @typescript-eslint/typedef */
import { body } from 'express-validator';
import { User } from '../common/config/db-config';
import { Op } from 'sequelize';
import { BadRequestError } from '@alqemam/express-errors';
import { validateCountryPhone } from './phoneNumber';
export const getCountries_validate = [
  body('size')
    .notEmpty()
    .withMessage("limit can't be empty")
    .isInt({ min: 3, max: 100 })
    .withMessage('limit accept only numbers between 3 and 30 !!'),
  body('page').notEmpty().withMessage("limit can't be empty").isInt().withMessage('offset accept only numbers !!'),
  body('search')
    .optional({ values: 'undefined' })
    .if((v: unknown) => v !== '')
    .isAlpha()
    .withMessage('search must be string !!'),
];

export const getCities_validate = [
  body('size')
    .notEmpty()
    .withMessage("limit can't be empty")
    .isInt({ min: 3, max: 100 })
    .withMessage('limit accept only numbers between 3 and 30 !!'),
  body('page').notEmpty().withMessage("limit can't be empty").isInt().withMessage('offset accept only numbers !!'),
  body('search')
    .optional({ values: 'undefined' })
    .if((v: unknown) => v !== '')
    .isAlpha()
    .withMessage('search must be string !!'),
  body('countryID')
    .notEmpty()
    .withMessage('country ID is Required')
    .isInt({ min: 1, max: 250 })
    .withMessage('ID is not valid !!'),
];

export const saveUserInfo_validate = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name can not be empty!!')
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required for first name!')
    .isLength({ max: 20 })
    .withMessage('Maximum 20 characters required for first name!')
    .isAlpha()
    .withMessage('First name should be string'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name can not be empty!!')
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required for first name!')
    .isLength({ max: 20 })
    .withMessage('Maximum 20 characters required for first name!')
    .isAlpha()
    .withMessage('Last name should be string'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Invalid email address!')
    .isEmail()
    .withMessage('Invalid email address!')
    .custom(async (_, { req }) => {
      const { email, phoneNumber, linkedinURL } = req.body;
      const user = await User.findOne({
        where: {
          [Op.or]: [{ email }, { phone_number: phoneNumber }, { linkedin_URL: linkedinURL }],
        },
      });
      if (user) {
        throw new BadRequestError('email or phoneNumber or linkedinURL is already exists');
      }
      return true;
    }),

  body('countryCode', 'phoneNumber')
    .trim()
    .custom((_, { req }) => {
      const { countryCode, phoneNumber } = req.body;
      //   if (!country && !phoneNumber) return true;
      req.phoneNumber = validateCountryPhone(phoneNumber, countryCode || 'EG');
      return true;
    }),
  body('cityID').trim().notEmpty().withMessage('cityID is required').isInt().withMessage('city id must be integer'),
  body('linkedinURL').trim().notEmpty().withMessage('linkedinURL is required').isURL().withMessage('url is invalid'),
  body('website')
    .trim()
    .optional({ values: 'undefined' })
    .if((v: unknown) => v !== '')
    .isURL()
    .withMessage('url is invalid'),
  body('cvTemplateID')
    .trim()
    .notEmpty()
    .withMessage('cv template id is required !!')
    .isUUID()
    .withMessage('invalid ID !!'),
];

export const validateTemplateID = [
  body('id').notEmpty().withMessage('id is required !!').isUUID().withMessage('invalid id !!'),
];
