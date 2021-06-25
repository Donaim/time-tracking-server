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
   * @param {string} title - The title of the task.
   * @param {string=} description - Task description.
   * @returns {void}
   */
  async startTask(title: string, description: string | null): Promise<void> {
    await DB.startTask(title, description);
  }

  /**
   * Handler for stopTask request.
   * @returns {StopTaskResult}
   */
  async stopTask(): Promise<T.StopTaskResult> {
    const result = await DB.stopTask();
    switch (result) {
      case T.DbStopTaskStatus.OK:
        return T.StopTaskResult.OK;
      case T.DbStopTaskStatus.RecordNotFound:
        return T.StopTaskResult.NoCurrentTask;
    }
  }

  /**
   * Handler for getCurrentTask request.
   * @returns {GetCurrentTaskResult}
   */
  async getCurrentTask(): Promise<T.GetCurrentTaskResult> {
    return await DB.getCurrentTask();
  }
}
