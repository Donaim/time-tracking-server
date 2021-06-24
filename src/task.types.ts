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
 * @typedef {Object} GetCurrentTaskResult
 */
export type GetCurrentTaskResult = {
  /**
   * Status flag that is true only when everything succeded.
   * @type{boolean}
   */
  success: boolean;
  name: string;
  description: string;
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
  name: string;
  description: string;
};