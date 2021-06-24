import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { StartTaskResult } from './task.types';

/**
 * Task module controller.
 * Handles task-management requests.
 * @namespace
 */
@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * GET /start_task request.
   * Stops current task, creates new one, and makes it current.
   * @param {string} name - The name of the task.
   * @param {string=} description - Task description.
   * @returns {StartTaskResult}
   */
  @Get('/start_task')
  startTask(
    @Query('name') name: string,
    @Query('description') description: string | undefined = undefined,
  ): StartTaskResult {
    if (!name) {
      throw new HttpException(
        'Name cannot be empty',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return this.taskService.startTask(name, description);
  }
}
