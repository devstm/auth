import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { TasksController } from './controller/tasks.controller';
import { taskProviders } from './services/tasks.providers';

@Module({
  providers: [TasksService, ...taskProviders],
  controllers: [TasksController],
})
export class TasksModule {}
