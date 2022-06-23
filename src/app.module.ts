import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './modules/database/database.module';
import { TasksModule } from './modules/tasks/tasks.module';
// import { AuthModule } from './modules/auth/auth.module';
import config from '../config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UsersModule,
    DatabaseModule,
    TasksModule,
    // AuthModule,
  ],
})
export class AppModule {}
