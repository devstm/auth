import { Task } from '../model/tasks.model';
import { TASK_REPOSITORY } from '../../../common/constants';

export const taskProviders = [
  {
    provide: TASK_REPOSITORY,
    useValue: Task,
  },
];
