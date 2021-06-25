import Sequelize from 'sequelize';
import { sequelize } from './database';

/**
 * Defines Task ORM interface.
 */
export const Task = sequelize.define(
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
