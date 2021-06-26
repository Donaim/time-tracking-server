/**
 * This file contains type definitions related to task operations.
 * @namespace task/types
 */

/**
 * This variable is here to make JSDoc
 * work with a file that only contains type definitions.
 * @memberof task/types
 * @private
 */
export let jsdocHack;

/**
 * @typedef {Object} StartTaskResponse
 * @memberof task/types
 */
export type StartTaskResponse = {
  /**
   * HTTP status code for the start task operation
   * @type{number}
   */
  statusCode: number;
};

/**
 * Result of service stopTask operation.
 * @typedef {Object} StopTaskResult
 * @memberof task/types
 */
export enum StopTaskResult {
  OK,
  NoCurrentTask,
}

/**
 * @typedef {Object} StopTaskResponse
 * @memberof task/types
 */
export type StopTaskResponse = {
  /**
   * HTTP status code for the start task operation
   * @type{number}
   */
  statusCode: number;
};

/**
 * @typedef {Object} TaskRecord
 * @memberof task/types
 */
export type TaskRecord = {
  /**
   * Task title.
   * @type{string}
   */
  title: string;

  /**
   * Task description.
   * @type{string=}
   */
  description: string | null;

  /**
   * Task start time as Unix timestamp in UTC.
   * @type{number}
   */
  startt: number;

  /**
   * Task end time as Unix timestamp in UTC.
   * Null if not finished.
   * @type{number=}
   */
  endt: number | null;
};

/**
 * @typedef {Object} GetCurrentTaskResult
 * @memberof task/types
 */
export type GetCurrentTaskResult = {
  /**
   * @type {TaskRecord=}
   */
  task: TaskRecord | null;
};

/**
 * @typedef {Object} GetCurrentTaskResponse
 * @memberof task/types
 */
export type GetCurrentTaskResponse = {
  /**
   * HTTP status code for the start task operation
   * @type{number}
   */
  statusCode: number;

  /**
   * @type {TaskRecord}
   */
  task: TaskRecord;
};

/**
 * @typedef {Object} TaskDbEntry
 * @memberof task/types
 */
export type TaskDbEntry = {
  /**
   * @type {TaskRecord=}
   */
  task: TaskRecord | null;
};

/**
 * @typedef {Object} DbStopTaskStatus
 * @memberof task/types
 */
export enum DbStopTaskStatus {
  OK,
  RecordNotFound,
}
