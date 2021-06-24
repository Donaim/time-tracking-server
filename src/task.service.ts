import { Injectable } from '@nestjs/common';
import * as T from './task.types';

/**
 * Task module service.
 * Communicates with database.
 * Used by {@link TaskController}.
 */
@Injectable()
export class TaskService {
  /**
   * Handler for startTask request.
   * @param {string} name - The name of the task.
   * @param {string} description - Task description.
   * @returns {StartTaskResult}
   */
  startTask(name: string, description: string | undefined): T.StartTaskResult {
    // TODO: database requests
    name = name + description;
    return { success: true };
  }

  /**
   * Handler for stopTask request.
   * @returns {StopTaskResult}
   */
  stopTask(): T.StopTaskResult {
    // TODO: database requests
    return { success: true };
  }

  /**
   * Handler for getCurrentTask request.
   * @returns {GetCurrentTaskResult}
   */
  getCurrentTask(): T.GetCurrentTaskResult {
    // TODO: database requests
    return { success: true, name: 'TODO', description: 'TODO' };
  }
}
