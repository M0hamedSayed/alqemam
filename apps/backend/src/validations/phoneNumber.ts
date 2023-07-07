/* eslint-disable @typescript-eslint/no-explicit-any */
import countries from 'i18n-iso-countries';
import parsePhoneNumber from 'libphonenumber-js/mobile';
import { ForbiddenError } from '@alqemam/express-errors';

export const validateCountryPhone = (phoneNumber: string, countryCode: string) => {
  const country = countries.getName(countryCode, 'en');
  if (!country) throw new ForbiddenError('Invalid Country');
  if (isNaN(phoneNumber as any)) throw new ForbiddenError('phone number must be only number type');
  const phone = parsePhoneNumber(phoneNumber, countryCode as any);
  if (!phone.isValid()) throw new ForbiddenError('Invalid phone Number');
  return phone.number;
}; // validate country and phone number
