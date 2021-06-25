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
  startTask(
    @Query('name') name: string,
    @Query('description') description: string | undefined = undefined,
  ): T.StartTaskResponse {
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
   * @returns {StopTaskResponse}
   */
  @Get('/stop_task')
  async stopTask(): Promise<T.StopTaskResponse> {
    const result = await this.taskService.stopTask();
    const body = result.body;
    if (body.kind == T.StopTaskResultKind.OK) {
      return { statusCode: 200 };
    } else {
      /* Note: do not show the user specific error because that is insecure */
      const message =
        body.kind == T.StopTaskResultKind.NoCurrentTask
          ? 'No current task'
          : 'Internal server error';
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
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
