import Sequelize from 'sequelize';

/**
 * This file implements PostgreSQL on Sequelize driver.
 * @namespace database
 */

/**
 * Sequelize instance. Used to create ORM interfaces.
 * @memberof database
 */
export const sequelize = new Sequelize.Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    dialect: 'postgres',
  },
);

/**
 * Sends authenticate request to database server
 * to check if connection is alright.
 * @returns {null | Error}
 * @memberof database
 */
export async function testConnection() {
  try {
    await sequelize.authenticate();
    return null;
  } catch (err) {
    return err;
  }
}
