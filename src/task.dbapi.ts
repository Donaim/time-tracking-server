import { Op } from 'sequelize';
import { Task } from './task.dbentry';
import { getCurrentTimestamp } from './time';

/**
 * Task module Database API.
 * Communicates with the actual database.
 * @namespace task/dbapi
 */

/**
 * Fetches current task database record.
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
        }
    });

    return result;
}

