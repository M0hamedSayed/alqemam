/* eslint-disable @typescript-eslint/naming-convention */
import { Model, Sequelize } from 'sequelize';
import { DataType } from '../types';
export class UserImgs extends Model {}

export default (sequelize: Sequelize, DataTypes: DataType) => {
  return UserImgs.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'name',
      },
      type: {
        type: DataTypes.ENUM('png', 'jpg'),
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
    },
    { sequelize, timestamps: true, modelName: 'user-imgs', freezeTableName: true },
  );
};
