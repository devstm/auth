import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { taskControllerName } from 'src/common/constants';
import { AuthGuard } from 'src/common/guards/auth.gard';
import { TaskCreateDTO } from '../dto/taskCreate.dto';
import { Task } from '../model/tasks.model';
import { TasksService } from '../services/tasks.service';

@UseGuards(AuthGuard)
@Controller(taskControllerName)
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get(':userId')
  index(@Param('userId') userId: number): Promise<Task[]> {
    return this.taskService.getAll(userId);
  }

  @Get(':id')
  show(@Param('id') id: number): Promise<Task> {
    return this.taskService.getOne(id);
  }

  @Post()
  store(@Body() taskCreate: TaskCreateDTO): Promise<Task> {
    return this.taskService.create(taskCreate);
  }
  @Patch(':id')
  update(
    @Body() taskUpdate: TaskCreateDTO,
    @Param('id') id: number,
  ): Promise<Task> {
    return this.taskService.update(id, taskUpdate);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<any> {
    return this.taskService.delete(id);
  }
}
