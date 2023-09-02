/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HasManyAddAssociationMixin, Model, Sequelize } from 'sequelize';
import { DataType } from '../types';
import { CVTemplate } from '../common/config/db-config';
export class User extends Model {
  declare addCVTemplate: HasManyAddAssociationMixin<typeof CVTemplate, any>;
}

export default (sequelize: Sequelize, DataTypes: DataType) => {
  return User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      full_name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.getDataValue('first_name')} ${this.getDataValue('last_name')}`;
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: 'email',
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
      phone_number: {
        type: DataTypes.STRING,
        unique: 'phone_number',
        allowNull: true,
      },
      city_id: {
        type: DataTypes.MEDIUMINT,
        allowNull: true,
      },
      linkedin_URL: {
        type: DataTypes.STRING,
        unique: 'linkedin_URL',
        allowNull: false,
        validate: {
          isUrl: { msg: 'invalid url' },
        },
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { sequelize, timestamps: true, modelName: 'users', freezeTableName: true },
  );
};
