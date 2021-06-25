import { Op } from 'sequelize';
import { transaction } from './database';
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
 * Updates database entry related to current task,
 * and inserts new task to the database.
 * @returns {null | Error}
 * @memberof task/dbapi
 */
export async function startTask(
  title: string,
  description: string | null,
): Promise<void> {
  const currentt = getCurrentTimestamp();
  const record = await getCurrentTaskRecord();
  const newRecord: T.TaskDbEntry = {
    task: {
      name: title,
      description: description,
      startt: currentt,
      endt: null,
    },
  };

  await transaction(async (t) => {
    if (record) {
      await record.update({ endt: currentt }, { transaction: t });
    }

    await Task.create(newRecord, { transaction: t });
  });

  Task.sync();
}

/**
 * Updates database entry related to current task.
 * @returns {DbStopTaskStatus}
 * @memberof task/dbapi
 */
export async function stopTask(): Promise<T.DbStopTaskStatus> {
  const currentt = getCurrentTimestamp();
  const record = await getCurrentTaskRecord();

  if (record) {
    try {
      await record.update({ endt: currentt });
      Task.sync();
      return { body: { kind: T.DbStopTaskStatusKind.OK } };
    } catch (err) {
      return { body: { kind: T.DbStopTaskStatusKind.Error, error: err } };
    }
  } else {
    return { body: { kind: T.DbStopTaskStatusKind.RecordNotFound } };
  }
}

/**
 * Fetches current task database record.
 * @returns {TaskDbEntry}
 * @memberof task/dbapi
 */
export async function getCurrentTask(): Promise<T.TaskDbEntry> {
  const record = await getCurrentTaskRecord();

  if (record) {
    const ret: T.TaskDbEntry = {
      task: {
        name: record.getDataValue('title'),
        description: record.getDataValue('description'),
        startt: record.getDataValue('startt'),
        endt: record.getDataValue('endt'),
      },
    };
    return ret;
  } else {
    return null;
  }
}
