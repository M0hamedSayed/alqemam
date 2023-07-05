/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/naming-convention */
import { DataTypes, Sequelize } from 'sequelize';
import { logger } from '../utils/logger';
import UserModel from '../../models/User';
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
    // db.models.User = UserModel(db.sequelize, DataTypes);
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

export const User = UserModel(sequelize, DataTypes);

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

    // await User.create({
    //   firstName: 'mohamed',
    //   lastName: 'sayed',
    //   email: 'mohamed.sayed.atiaa@gmail.com',
    //   password: 'Mohasa*01660',
    //   passwordConfirm: 'Mohasa*01660',
    // });
  } catch (error: unknown) {
    throw new DbConnectionError(error as string);
  }
};
