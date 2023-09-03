/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-use-before-define */
import { DataTypes, Model, Sequelize } from 'sequelize';
import { validateCountryPhone } from '../validations/phoneNumber';
import { handlePassErrors } from '../validations/password';
import * as bcrypt from 'bcrypt';

export class User extends Model {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  passwordHash: string;
  country: string;
  facebookID: string;
  facebookInfo: object;
  emailVerified: boolean;
  firstRegistration: boolean;
  image: string;
  otp: string;
  otpValidTo: Date;
  createdAt: Date;
  updatedAt: Date;

  async comparePassword(password: string): Promise<number> {
    if (!this.getDataValue('passwordHash')) return 1;
    const match = await bcrypt.compare(password, this.getDataValue('passwordHash'));
    if (!match) return 0;
    return 2;
  }

  public toJSON(): any {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.passwordConfirm;
    delete values.passwordHash;
    values.id = this.id || this.getDataValue('id');
    return values;
  }
}

type DataType = typeof DataTypes;

export default (sequelize: Sequelize, DataTypes: DataType) => {
  return User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      info_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.getDataValue('firstName')} ${this.getDataValue('lastName')}`;
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Your E-Mail is Required !!',
          },
          is: {
            args: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            msg: 'Email Syntax is wrong',
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.VIRTUAL,
        set(value: string) {
          this.setDataValue('password', value);
        },
      },
      passwordConfirm: {
        type: DataTypes.VIRTUAL,
      },
      passwordHash: {
        type: DataTypes.STRING,
      },
      facebookID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      facebookInfo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      firstRegistration: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otp: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      otpValidTo: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      defaultScope: {
        attributes: {
          include: ['id'],
          exclude: ['password', 'passwordConfirm'],
        },
      },
      sequelize,
      validate: {
        validatePhoneNumber() {
          if (this.getDataValue('phoneNumber') && this.getDataValue('country'))
            validateCountryPhone(this.getDataValue('phoneNumber'), this.getDataValue('country') || 'EG');
        },
        validatePassword() {
          handlePassErrors(this.getDataValue('password'), this.getDataValue('passwordConfirm'));
          const salt = bcrypt.genSaltSync(10);
          const password = bcrypt.hashSync(this.getDataValue('password'), salt);
          this.setDataValue('passwordHash', password);
        },
      },
    },
  );
};
