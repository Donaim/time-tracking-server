import Sequelize from 'sequelize';

import connection = require('../connection.json');

/**
 * Sequelize instance. Used to create ORM interfaces.
 */
export const sequelize = new Sequelize.Sequelize(
  connection.database,
  connection.user,
  undefined,
  {
    host: connection.host,
    port: connection.port,
    dialect: 'postgres',
  },
);

/**
 * Sends authenticate request to database server
 * to check if connection is alright.
 * @returns {null | Error}
 */
export async function testConnection() {
  try {
    await sequelize.authenticate();
    return null;
  } catch (err) {
    return err;
  }
}

/**
 * Performs database transaction.
 */
export const transaction = sequelize.transaction;
