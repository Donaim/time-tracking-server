import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import * as T from './task.types';

/**
 * Task module controller.
 * Handles task-management requests.
 * Packs and unpacks HTTP messages for {@link TaskService}.
 */
@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/start_task')
  @ApiParam({ name: 'title', required: true, description: 'Task title' })
  @ApiParam({
    name: 'description',
    required: false,
    description: 'Task description',
  })
  @ApiOperation({
    summary: 'Stops current task, creates new one, and makes it current',
  })
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

  @Get('/stop_task')
  @ApiOperation({ summary: 'Stops current task' })
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

  @Get('/get_current_task')
  /* TODO: find a way to provide examples within Nest.js/swagger API */
  @ApiOperation({
    summary: 'Returns current task',
    description:
      'example response: { "statusCode": 200, "title": "A", "description": null, "startt": 12345, "endt": null }',
  })
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
