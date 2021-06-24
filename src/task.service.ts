import { Injectable } from '@nestjs/common';
import { StartTaskResult } from './task.types';

/**
 * Task module service.
 * Used by {@link TaskController}.
 */
@Injectable()
export class TaskService {
  /**
   * Handler for startTask request.
   * Performs database mutations.
   * @param {string} name - The name of the task.
   * @param {string} description - Task description.
   * @returns {StartTaskResult}
   */
  startTask(name: string, description: string | undefined): StartTaskResult {
    // TODO: database requests
    name = name + description;
    return { statusCode: 200 };
  }
}
