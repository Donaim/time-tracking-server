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
   * Handler for getStartTask request
   * @param {string} name - The name of the task.
   * @param {string} description - Task description.
   * @returns {StartTaskResult}
   */
  getStartTask(name: string, description: string | undefined): StartTaskResult {
    // TODO: database requests
    name = name + description;
    return { statusCode: 200 };
  }
}
