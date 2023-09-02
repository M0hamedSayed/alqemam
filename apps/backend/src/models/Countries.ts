/* eslint-disable @typescript-eslint/naming-convention */
import { Model, Sequelize } from 'sequelize';
import { DataType } from '../types';
export class Countries extends Model {}

export default (sequelize: Sequelize, DataTypes: DataType) => {
  return Countries.init(
    {
      id: {
        type: DataTypes.MEDIUMINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      iso3: {
        type: DataTypes.CHAR(3),
        defaultValue: null,
      },
      numeric_code: {
        type: DataTypes.CHAR(3),
        defaultValue: null,
      },
      iso2: {
        type: DataTypes.CHAR(2),
        defaultValue: null,
      },
      phonecode: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      capital: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      currency_name: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      currency_symbol: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      tld: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      native: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      region: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      subregion: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      nationality: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      timezones: DataTypes.TEXT,
      translations: DataTypes.TEXT,
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        defaultValue: null,
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        defaultValue: null,
      },
      emoji: {
        type: DataTypes.CHAR(191),
        defaultValue: null,
      },
      emojiU: {
        type: DataTypes.CHAR(191),
        defaultValue: null,
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      flag: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
      wikiDataId: {
        type: DataTypes.STRING,
        defaultValue: 'Rapid API GeoDB Cities',
      },
    },
    { sequelize, timestamps: false, modelName: 'countries', freezeTableName: true },
  );
};
