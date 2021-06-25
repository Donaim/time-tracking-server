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
 * @typedef {Object} StartTaskResponse
 */
export type StartTaskResponse = {
  /**
   * HTTP status code for the start task operation
   * @type{number}
   */
  statusCode: number;
};

export enum StopTaskResultKind {
  OK,
  NoCurrentTask,
  Error,
}

export type StopTaskResultOk = {
  kind: StopTaskResultKind.OK;
};

export type StopTaskResultNoCurrentTask = {
  kind: StopTaskResultKind.NoCurrentTask;
};

export type StopTaskResultError = {
  kind: StopTaskResultKind.Error;
  error: Error;
};

/**
 * Result of service stopTask operation.
 * @typedef {Object} StopTaskResult
 */
export type StopTaskResult = {
  /* Note: JSDoc does not handle syntax "type X = A | B | C",
   * so redundant "body" field is introduced */
  body: StopTaskResultOk | StopTaskResultNoCurrentTask | StopTaskResultError;
};

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

export enum DbStopTaskStatusKind {
  OK,
  RecordNotFound,
  Error,
}

type DbStopTaskStatusOK = {
  kind: DbStopTaskStatusKind.OK;
};

type DbStopTaskStatusRecordNotFound = {
  kind: DbStopTaskStatusKind.RecordNotFound;
};

type DbStopTaskStatusError = {
  kind: DbStopTaskStatusKind.Error;
  error: Error;
};

/**
 * @typedef {Object} DbStopTaskStatus
 */
export type DbStopTaskStatus = {
  /* Note: JSDoc does not handle syntax "type X = A | B | C",
   * so redundant "body" field is introduced */
  body:
    | DbStopTaskStatusOK
    | DbStopTaskStatusRecordNotFound
    | DbStopTaskStatusError;
};
