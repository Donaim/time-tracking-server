import Sequelize from 'sequelize';
import { sequelize } from './database';

let taskValue = undefined;

/**
 * Defines Task ORM interface.
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
