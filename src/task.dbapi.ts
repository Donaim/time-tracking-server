import { Op } from 'sequelize';
import * as T from './task.types';
import { Task } from './task.dbentry';
import { getCurrentTimestamp } from './time';

/**
 * Task module Database API.
 * Communicates with the actual database.
 * @namespace task/dbapi
 */

/**
 * Helper function for fetching current database record.
 * @memberof task/dbapi
 */
async function getCurrentTaskRecord() {
  const currentt = getCurrentTimestamp();
  return await Task.findOne({
    where: {
      endt: null,
      startt: {
        [Op.lte]: currentt,
      },
    },
  });
}

/**
 * Updates database entry related to current task.
 * @returns {DbStopTaskStatus}
 * @memberof task/dbapi
 */
export async function stopTask(): Promise<T.DbStopTaskStatus> {
  const currentt = getCurrentTimestamp();
  const result = await getCurrentTaskRecord();

  if (result) {
    try {
      await result.update({ endt: currentt });
      Task.sync();
      return null;
    } catch (err) {
      return err;
    }
  } else {
    return 'RecordNotFoundError';
  }
}

/**
 * Fetches current task database record.
 * @returns {TaskDbEntry}
 * @memberof task/dbapi
 */
export async function getCurrentTask() {
  const result = await getCurrentTaskRecord();

  if (result) {
    const ret: T.TaskDbEntry = {
      task: {
        name: result.getDataValue('title'),
        description: result.getDataValue('description'),
        startt: result.getDataValue('startt'),
        endt: result.getDataValue('endt'),
      },
    };
    return ret;
  } else {
    return null;
  }
}
