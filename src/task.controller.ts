import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import * as T from './task.types';

/**
 * Task module controller.
 * Handles task-management requests.
 * Packs and unpacks HTTP messages for {@link TaskService}.
 */
@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  /**
   * Handler for
   * GET /start_task request.
   *
   * Stops current task, creates new one, and makes it current.
   * @param {string} name - The name of the task.
   * @param {string=} description - Task description.
   * @returns {StartTaskResultResponse}
   */
  @Get('/start_task')
  startTask(
    @Query('name') name: string,
    @Query('description') description: string | undefined = undefined,
  ): T.StartTaskResultResponse {
    if (!name) {
      throw new HttpException(
        'Name cannot be empty',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const result = this.taskService.startTask(name, description);
    if (result.success) {
      return { statusCode: 200 };
    } else {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Handler for
   * GET /stop_task request.
   *
   * Stops current task.
   * @returns {StopTaskResultResponse}
   */
  @Get('/stop_task')
  stopTask(): T.StopTaskResultResponse {
    const result = this.taskService.stopTask();
    if (result.success) {
      return { statusCode: 200 };
    } else {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Handler for
   * GET /get_current_task request.
   *
   * Returns current task.
   * @returns {GetCurrentTaskResultResponse}
   */
  @Get('/get_current_task')
  getCurrentTask(): T.GetCurrentTaskResultResponse {
    const result = this.taskService.getCurrentTask();
    if (result.success) {
      return { statusCode: 200, ...result };
    } else {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
