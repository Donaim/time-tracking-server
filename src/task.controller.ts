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
   * @returns {StartTaskResponse}
   */
  @Get('/start_task')
  async startTask(
    @Query('name') name: string,
    @Query('description') description: string | null = null,
  ): Promise<T.StartTaskResponse> {
    if (!name) {
      throw new HttpException(
        'Name cannot be empty',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    try {
      await this.taskService.startTask(name, description);
      return { statusCode: 200 };
    } catch (err) {
      /* Note: do not show specific error because it is insecure */
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
    switch (result.body.kind) {
      case T.StopTaskResultKind.OK:
        return { statusCode: 200 };
      case T.StopTaskResultKind.NoCurrentTask:
        throw new HttpException(
          'No current task',
          HttpStatus.PRECONDITION_FAILED,
        );
      case T.StopTaskResultKind.Error:
        /* Note: do not show specific error because it is insecure */
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
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
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
