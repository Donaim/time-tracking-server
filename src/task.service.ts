import { Injectable } from '@nestjs/common';

/**
 * @typedef {Object} StartTaskResult
 */
export type StartTaskResult = {
  /**
   * HTTP status code for the start task operation
   * @type{number}
   */
  statusCode: number;
};

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
