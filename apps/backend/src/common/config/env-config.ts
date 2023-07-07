import LoadDependencies from '../dependencies/LoadDependencies';

LoadDependencies.getInstance().loadDotEnv().config();
const config = {
  app: {
    port: parseInt(process.env.PORT, 0) || 3000,
  },
  db: {
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
  },
  facebook: {
    clientId: process.env.facebookCLIENT_ID,
    clientSecret: process.env.facebookCLIENT_SECRET,
  },
  baseUrl: process.env.BASE_API_URL,
  frontUrl: process.env.FRONT_URL,
  nodeEnv: process.env.NODE_ENV,
  email: {
    admin: process.env.Admin_email,
    pass: process.env.Admin_pass,
  },
};

export default config;
