/**
 * @file Contains type definitions related to task operations.
 */

/**
 * @typedef {Object} StartTaskResponse
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
 */
export enum StopTaskResult {
  OK,
  NoCurrentTask,
}

/**
 * @typedef {Object} StopTaskResponse
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
 */
export type GetCurrentTaskResult = {
  /**
   * @type {TaskRecord=}
   */
  task: TaskRecord | null;
};

/**
 * @typedef {Object} GetCurrentTaskResponse
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
 */
export type TaskDbEntry = {
  /**
   * @type {TaskRecord=}
   */
  task: TaskRecord | null;
};

/**
 * @typedef {Object} DbStopTaskStatus
 */
export enum DbStopTaskStatus {
  OK,
  RecordNotFound,
}
