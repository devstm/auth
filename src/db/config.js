// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const databaseConfig = {
  dialect: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  pool: {
    min: 5,
    max: 30,
    idle: 20000,
  },
};

module.exports = databaseConfig;
