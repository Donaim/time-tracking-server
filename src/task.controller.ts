import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TaskService, StartTaskResult } from './task.service';

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
   * @param {string} name - The name of the task.
   * @param {string=} description - Task description.
   * @returns {StartTaskResult}
   */
  @Get('/start_task')
  getStartTask(
    @Query('name') name: string,
    @Query('description') description: string | undefined = undefined,
  ): StartTaskResult {
    if (!name) {
      throw new HttpException(
        'Name cannot be empty',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return this.taskService.getStartTask(name, description);
  }
}
