import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { taskControllerName } from 'src/common/constants';
import { AuthGuard } from 'src/common/guards/auth.gard';
import { CustomError } from 'src/common/utils';
import { TaskCreateDTO } from '../dto/taskCreate.dto';
import { Task } from '../model/tasks.model';
import { TasksService } from '../services/tasks.service';

@UseGuards(AuthGuard)
@Controller(taskControllerName)
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get(':userId')
  index(@Param('userId') userId: number, @Req() request: any): Promise<Task[]> {
    if (request.userId !== userId) {
      throw new CustomError('You are not authorized', 401);
    }
    return this.taskService.getAll(userId);
  }

  @Get('task/:id')
  show(@Param('id') id: number, @Req() request: any): Promise<Task> {
    return this.taskService.getOne(id, request.userId);
  }

  @Post()
  store(@Body() taskCreate: TaskCreateDTO): Promise<Task> {
    return this.taskService.create(taskCreate);
  }
  @Patch(':id')
  update(
    @Body() taskUpdate: TaskCreateDTO,
    @Param('id') id: number,
    @Req() request: any,
  ): Promise<Task> {
    return this.taskService.update(id, taskUpdate, request.userId);
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Req() request: any): Promise<any> {
    return this.taskService.delete(id, request.userId);
  }
}
