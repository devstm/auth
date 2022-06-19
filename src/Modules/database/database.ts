import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Task } from '../tasks/model/tasks.model';
import { User } from '../users/model/users.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.get('database'));
      sequelize.addModels([User, Task]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
