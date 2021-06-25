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
   * @param {string=} description - Task description.
   * @returns {null | Error}
   */
  async startTask(name: string, description: string | null): Promise<void> {
    await DB.startTask(name, description);
  }

  /**
   * Handler for stopTask request.
   * @returns {StopTaskResult}
   */
  async stopTask(): Promise<T.StopTaskResult> {
    const result = await DB.stopTask();
    switch (result.body.kind) {
      case T.DbStopTaskStatusKind.OK:
        return { body: { kind: T.StopTaskResultKind.OK } };
      case T.DbStopTaskStatusKind.RecordNotFound:
        return { body: { kind: T.StopTaskResultKind.NoCurrentTask } };
      case T.DbStopTaskStatusKind.Error:
        return {
          body: { kind: T.StopTaskResultKind.Error, error: result.body.error },
        };
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
