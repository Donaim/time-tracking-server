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
   * @param {string} title - The title of the task.
   * @param {string=} description - Task description.
   * @returns {StartTaskResponse}
   */
  @Get('/start_task')
  async startTask(
    @Query('title') title: string,
    @Query('description') description: string | null = null,
  ): Promise<T.StartTaskResponse> {
    if (!title) {
      throw new HttpException(
        'Title cannot be empty',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    await this.taskService.startTask(title, description);
    return { statusCode: 200 };
  }

  /**
   * Handler for
   * GET /stop_task request.
   *
   * Stops current task.
   * @returns {StopTaskResponse}
   */
  @Get('/stop_task')
  async stopTask(): Promise<T.StopTaskResponse> {
    const result = await this.taskService.stopTask();
    switch (result) {
      case T.StopTaskResult.OK:
        return { statusCode: 200 };
      case T.StopTaskResult.NoCurrentTask:
        throw new HttpException(
          'No current task',
          HttpStatus.PRECONDITION_FAILED,
        );
    }
  }

  /**
   * Handler for
   * GET /get_current_task request.
   *
   * Returns current task.
   * @returns {GetCurrentTaskResponse}
   */
  @Get('/get_current_task')
  async getCurrentTask(): Promise<T.GetCurrentTaskResponse> {
    const result = await this.taskService.getCurrentTask();
    if (result) {
      return { statusCode: 200, ...result };
    } else {
      throw new HttpException(
        'No current task',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
  }
}
