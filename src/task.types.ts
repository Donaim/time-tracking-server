/**
 * @file Contains type definitions related to task operations.
 */

/**
 * @typedef {Object} StartTaskResult
 */
export type StartTaskResult = {
  /**
   * Status flag that is true only when everything succeded.
   * @type{boolean}
   */
  success: boolean;
};

/**
 * @typedef {Object} StartTaskResultResponse
 */
export type StartTaskResultResponse = {
  /**
   * HTTP status code for the start task operation
   * @type{number}
   */
  statusCode: number;
};

/**
 * @typedef {Object} StopTaskResult
 */
export type StopTaskResult = {
  /**
   * Status flag that is true only when everything succeded.
   * @type{boolean}
   */
  success: boolean;
};

/**
 * @typedef {Object} StopTaskResultResponse
 */
export type StopTaskResultResponse = {
  /**
   * HTTP status code for the start task operation
   * @type{number}
   */
  statusCode: number;
};

/**
 * @typedef {Object} TaskRecord
 */
type TaskRecord = {
  /**
   * Task title.
   * @type{string}
   */
  name: string;

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
   * Status flag that is true only when everything succeded.
   * @type{boolean}
   */
  success: boolean;

  /**
   * @type {TaskRecord}
   */
  task: TaskRecord;
};

/**
 * @typedef {Object} GetCurrentTaskResultResponse
 */
export type GetCurrentTaskResultResponse = {
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
