/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Sequelize } from 'sequelize';
import { DataType } from '../types';
export class CVTemplate extends Model {}

export default (sequelize: Sequelize, DataTypes: DataType) => {
  return CVTemplate.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: 'name',
      },
      type: {
        type: DataTypes.ENUM('free', 'paid'),
        allowNull: false,
        defaultValue: 'free',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    { sequelize, timestamps: true, modelName: 'CVTemplate', freezeTableName: true },
  );
};
