import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import config from '../config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UsersModule,
    DatabaseModule,
  ],
})
export class AppModule {}
