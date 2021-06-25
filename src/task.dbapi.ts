import { Op, Model } from 'sequelize';
import { sequelize } from './database';
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
 * @returns {Model<any, any>}
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
 * Helper function to transform task database record into task structure.
 * @memberof task/dbapi
 * @returns {TaskRecord}
 */
function dbRecordToTaskRecord(record: Model<any, any>): T.TaskRecord {
  return {
    title: record.getDataValue('title'),
    description: record.getDataValue('description'),
    startt: record.getDataValue('startt'),
    endt: record.getDataValue('endt'),
  };
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
  const oldRecord = await getCurrentTaskRecord();
  const oldTask = dbRecordToTaskRecord(oldRecord);
  const newTask: T.TaskRecord = {
    title: title,
    description: description,
    startt: currentt,
    endt: null,
  };

  await sequelize.transaction(async (t) => {
    const update = oldRecord.update(
      { ...oldTask, endt: currentt },
      { transaction: t },
    );
    const create = Task.create(newTask, { transaction: t });
    await Promise.all([update, create]);
  });
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
    await record.update({ endt: currentt });
    return T.DbStopTaskStatus.OK;
  } else {
    return T.DbStopTaskStatus.RecordNotFound;
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
    const ret: T.TaskDbEntry = { task: dbRecordToTaskRecord(record) };
    return ret;
  } else {
    return null;
  }
}
