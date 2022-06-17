export default () => ({
  port: 3000,
  database: {
    dialect: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_TEST,
    password: process.env.DB_PASSWORD,
  },
});
