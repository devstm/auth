import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.HOST || 'localhost',
      username: process.env.USER_NAME || 'root',
      database: process.env.DATABASE || 'auth',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
