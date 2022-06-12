import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        username: 'root',
        password: null,
        database: 'auth',
      });
      await sequelize.sync();
      return sequelize;
    },
  },
];
