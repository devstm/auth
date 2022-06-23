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
import { Role } from 'src/auth/role.enum';
import { User } from 'src/auth/roles.decorator';
// import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.gard';
import { UserGuard } from 'src/common/guards/role.gard';
import { CustomError } from 'src/common/utils';
import { TaskCreateDTO } from '../dto/taskCreate.dto';
import { Task } from '../model/tasks.model';
import { TasksService } from '../services/tasks.service';

interface TaskParams {
  id: number;
  userId: number;
}

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @UseGuards(UserGuard)
  @Get(':userId')
  index(@User() userId: TaskParams): Promise<Task[]> {
    return this.taskService.getAll(userId.userId);
  }

  @UseGuards(AuthGuard)
  @Get('task/:id')
  show(@User() user: TaskParams): Promise<Task> {
    const { id, userId } = user;
    return this.taskService.getOne(id, userId);
  }

  @UseGuards(AuthGuard)
  @Post()
  store(@Body() taskCreate: TaskCreateDTO): Promise<Task> {
    return this.taskService.create(taskCreate);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Body() taskUpdate: TaskCreateDTO,
    @User() user: TaskParams,
  ): Promise<Task> {
    const { userId, id } = user;
    return this.taskService.update(id, taskUpdate, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@User() user: TaskParams): Promise<any> {
    const { userId, id } = user;
    return this.taskService.delete(id, userId);
  }
}
