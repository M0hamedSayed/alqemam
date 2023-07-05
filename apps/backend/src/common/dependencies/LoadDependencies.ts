/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-use-before-define */
import { PackageError } from '@alqemam/express-errors';
import { HelmetOptions } from 'helmet';
import dotenv from 'dotenv';

/**
 * @SingletonClass
 * load all packages
 */
export default class LoadDependencies {
  private static _instance: LoadDependencies;

  // singleton pattern
  public static getInstance(): LoadDependencies {
    if (!LoadDependencies._instance) LoadDependencies._instance = new LoadDependencies();
    return LoadDependencies._instance;
  }

  //express package
  loadExpress<Application>(): Application {
    try {
      return require('express')();
    } catch (error: unknown) {
      throw new PackageError('express');
    }
  }

  //helmet package
  loadHelmet(helmetOptions?: HelmetOptions) {
    try {
      return require('helmet')(helmetOptions);
    } catch (error: unknown) {
      throw new PackageError('helmet');
    }
  }

  //cookie-parser package
  loadCookieParser() {
    try {
      return require('cookie-parser')();
    } catch (error: unknown) {
      throw new PackageError('cookie-parser');
    }
  }

  // morgan package
  loadMorgan() {
    try {
      return require('morgan');
    } catch (error: unknown) {
      throw new PackageError('morgan');
    }
  }

  //winston package
  loadWinston() {
    try {
      return require('winston');
    } catch (error: unknown) {
      throw new PackageError('winston');
    }
  }

  // dotenv package
  loadDotEnv(): typeof dotenv {
    try {
      return require('dotenv');
    } catch (error: unknown) {
      throw new PackageError('winston');
    }
  }
}
