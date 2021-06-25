import { Injectable } from '@nestjs/common';
import * as T from './task.types';
import * as DB from './task.dbapi';

/**
 * Task module service.
 * Packs and unpacks messages for {@link task/dbapi}.
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
  async stopTask(): Promise<T.StopTaskResult> {
    const result = await DB.stopTask();
    if (result === null) {
      return { body: { kind: T.StopTaskResultKind.OK } };
    } else if (result === 'RecordNotFoundError') {
      return { body: { kind: T.StopTaskResultKind.NoCurrentTask } };
    } else {
      return { body: { kind: T.StopTaskResultKind.Error, error: result } };
    }
  }

  /**
   * Handler for getCurrentTask request.
   * @returns {GetCurrentTaskResult}
   */
  async getCurrentTask() {
    const result = await DB.getCurrentTask();
    if (result) {
      return {
        success: true,
        task: result.task,
      };
    } else {
      return {
        success: false,
        task: null,
      };
    }
  }
}
