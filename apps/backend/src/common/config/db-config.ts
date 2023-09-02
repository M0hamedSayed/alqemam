/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataTypes, Sequelize } from 'sequelize';
import { logger } from '../utils/logger';
import UserModel from '../../models/User';
import CountriesModel from '../../models/Countries';
import CitiesModel from '../../models/Cities';
import UserInfoModel from '../../models/UserInfo';
import CVTemplateModel from '../../models/CVTemplate';
import userImgsModel from '../../models/user-imgs';
import config from './env-config';
import mysql from 'mysql2/promise';
import { DbConnectionError } from '@alqemam/express-errors';

const { dbHost, dbName, dbPassword, dbUserName } = config.db;

// connect to db
const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  host: dbHost,
  port: 3306,
  dialect: 'mysql',
});

// create db if it doesn't exist
const initializeDB = async () => {
  try {
    const connection = await mysql.createConnection({ host: dbHost, user: dbUserName, password: dbPassword });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
// models
export const User = UserModel(sequelize, DataTypes);
// countries and cities
export const Countries = CountriesModel(sequelize, DataTypes);
export const Cities = CitiesModel(sequelize, DataTypes);
// users
export const UserInfo = UserInfoModel(sequelize, DataTypes);
// cvs
export const CVTemplate = CVTemplateModel(sequelize, DataTypes);
// user Images
export const UserImgs = userImgsModel(sequelize, DataTypes);
// relation between user and images
UserInfo.hasMany(UserImgs, { onDelete: 'CASCADE', foreignKey: 'user_id' });
UserImgs.belongsTo(UserInfo, { foreignKey: 'country_id' });
// relation between countries & cities --> one to many
Countries.hasMany(Cities, { onDelete: 'CASCADE', foreignKey: 'country_id' });
Cities.belongsTo(Countries, { foreignKey: 'country_id' });
// relation between cities & users --> one to many
Cities.hasMany(UserInfo, { foreignKey: 'city_id' });
UserInfo.belongsTo(Cities, { foreignKey: 'city_id' });
// relation between cvTemplate & users --> many to many
CVTemplate.belongsToMany(UserInfo, { through: 'cv_users' });
UserInfo.belongsToMany(CVTemplate, { through: 'cv_users' });
export const closeConnection = async () => {
  await sequelize.close();
};

/**
 * @function
 * connecting to mysql DB
 */
export const connectDB = async () => {
  try {
    await initializeDB();
    //Testing the connection
    await sequelize.authenticate({});
    logger.info('Connection has been established successfully.');

    //Synchronizing all models at once
    await sequelize.sync({ alter: true });
    logger.info('All models were synchronized successfully.');
  } catch (error: unknown) {
    throw new DbConnectionError(error as string);
  }
};
