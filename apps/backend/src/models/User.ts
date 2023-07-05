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

  async comparePassword(password: string): Promise<boolean> {
    const match = await bcrypt.compare(password, this.getDataValue('passwordHash'));
    if (!match) return false;
    return true;
  }

  public toJSON(): object {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.passwordConfirm;
    delete values.passwordHash;
    values.id = this.id;
    return values;
  }

  userData() {
    return {
      id: this.id,
      fullName: this.getDataValue('fullName'),
      image: this.getDataValue('image'),
      email: this.getDataValue('email'),
      phoneNumber: this.getDataValue('phoneNumber'),
      country: this.getDataValue('country'),
      facebookInfo: this.getDataValue('facebookInfo'),
      firstRegistration: this.getDataValue('firstRegistration'),
      emailVerified: this.getDataValue('emailVerified'),
      otp: this.getDataValue('otp'),
      otpValidTo: this.getDataValue('otpValidTo'),
      createdAt: this.getDataValue('createdAt'),
      updatedAt: this.getDataValue('updatedAt'),
    };
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
        type: DataTypes.JSON,
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
          exclude: ['password', 'passwordConfirm', 'passwordHash'],
        },
      },
      sequelize,
      validate: {
        validatePhoneNumber() {
          if (this.getDataValue('phoneNumber') && this.getDataValue('country'))
            validateCountryPhone(this.getDataValue('phoneNumber'), this.getDataValue('country') || 'Egypt');
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

// User.addHook('afterValidate', (user: User) => {
//   const salt = bcrypt.genSaltSync(10);
//   user.setDataValue('passwordHash', bcrypt.hashSync(user.password, salt));
// });

// User.sync({ alter: true }).then(() => {
//   return User.create({
//     firstName: 'mohamed',
//     lastName: 'sayed',
//     email: 'mohamed.sayed.atiaa@gmail.com',
//     password: 'Mohasa*01660',
//     passwordConfirm: 'Mohasa*01660',
//   }).then(data => {
//     console.log(data);
//   });
// });
