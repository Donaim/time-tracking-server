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
 * Fetches current task database record.
 * @returns {GetCurrentTaskDbEntry}
 * @memberof task/dbapi
 */
export async function getCurrentTask() {
  const currentt = getCurrentTimestamp();

  const result = await Task.findOne({
    where: {
      endt: null,
      startt: {
        [Op.lte]: currentt,
      },
    },
  });

  if (result) {
    const ret: T.GetCurrentTaskDbEntry = {
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
