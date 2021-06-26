import Sequelize from 'sequelize';
import { sequelize } from './database';

/**
 * This files contains ORM interface definitions
 * for Task related structures.
 * @namespace task/dbentry
 */

let taskValue = undefined;

/**
 * Returns Sequelize interface to tasks table.
 * Creates the table if it does not exist.
 * @memberof task/dbentry
 */
export async function Task() {
  if (taskValue === undefined) {
    taskValue = null;
    taskValue = await sequelize.define(
      'tasks',
      {
        title: { type: Sequelize.TEXT, allowNull: false },
        description: { type: Sequelize.TEXT, allowNull: true },
        startt: { type: Sequelize.INTEGER, allowNull: false },
        endt: { type: Sequelize.INTEGER, allowNull: true },
      },
      {
        timestamps: false,
      },
    );

    await taskValue.sync();
  }

  return taskValue;
}
