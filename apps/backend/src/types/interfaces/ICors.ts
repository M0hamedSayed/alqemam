export interface ICors {
  // specify all origins that can access to api
  origins: string[] | string;
  // allow credentials
  credentials: boolean;
}
