export interface IUser {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string | number;
  country: string;
  otp: string;
  firstName: string;
  lastName: string;
  otpValidTo: Date;
  emailVerified: boolean;
  firstRegistration: boolean;
  createdAt: Date;
  updatedAt: Date;
}
