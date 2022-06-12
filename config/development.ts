export default () => ({
  port: 3000,
  database: {
    dialect: 'mysql',
    host: process.env.HOST,
    username: process.env.USER_NAME,
    database: process.env.DATABASE,
  },
});
