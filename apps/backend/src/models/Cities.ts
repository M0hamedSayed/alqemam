/* eslint-disable @typescript-eslint/naming-convention */
import { Sequelize, Model } from 'sequelize';
import { DataType } from '../types';

export class Cities extends Model {}

export default (sequelize: Sequelize, DataTypes: DataType) => {
  return Cities.init(
    {
      id: {
        type: DataTypes.MEDIUMINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_id: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
      },
      country_code: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      fips_code: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      iso2: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      type: {
        type: DataTypes.STRING(191),
        defaultValue: null,
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        defaultValue: null,
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
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
    { sequelize, timestamps: false, modelName: 'cities', freezeTableName: true },
  );
};
