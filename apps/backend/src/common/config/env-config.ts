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

  jwt: {
    key: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE,
  },
  facebook: {
    clientId: process.env.facebookCLIENT_ID,
    clientSecret: process.env.facebookCLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALL_BACK_URL,
  },
  baseUrl: process.env.BASE_API_URL,
  frontUrl: process.env.FRONT_URL,
  salt: process.env.BCRYPT_SALT_ROUNDS,
  virtualHost: process.env.VIRTUAL_HOST,
  nodeEnv: process.env.NODE_ENV,
  email: {
    admin: process.env.Admin_email,
    pass: process.env.Admin_pass,
  },
};

export default config;
