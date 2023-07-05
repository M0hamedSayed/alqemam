import { ICerts } from './ICerts';

export interface IServerOptions {
  port: string | number;
  developmentMode: boolean;
  httpsInit: false | ICerts;
}
