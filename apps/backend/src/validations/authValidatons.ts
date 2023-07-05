/* eslint-disable @typescript-eslint/typedef */
import { body } from 'express-validator';
import { User } from '../common/config/db-config';
import { BadRequestError } from '@alqemam/express-errors';
import { validateCountryPhone } from './phoneNumber';
import { Op } from 'sequelize';

export const registerValidations = [
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
      const { email, phoneNumber } = req.body;
      const user = await User.findOne({
        where: {
          [Op.or]: [{ email }, { phoneNumber }],
        },
      });
      if (user) {
        throw new BadRequestError('email or phoneNumber is already exists');
      }
      return true;
    }),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('password can not be empty!!')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
    .withMessage(
      'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.',
    ),
  body('passwordConfirm')
    .trim()
    .notEmpty()
    .withMessage('passwordConfirm can not be empty!!')
    .custom((value, { req }) => {
      const { password } = req.body;
      if (password !== value) {
        throw new BadRequestError("Two Passwords doesn't Match.");
      }
      return true;
    }),
  body('country', 'phoneNumber')
    .trim()
    .custom((_, { req }) => {
      const { country, phoneNumber } = req.body;
      //   if (!country && !phoneNumber) return true;
      req.phoneNumber = validateCountryPhone(phoneNumber, country);
      return true;
    }),
]; //registration validation
