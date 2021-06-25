import * as T from '../task.types';

export async function startTask() {
  return null;
}

export async function stopTask() {
  return T.DbStopTaskStatus.OK;
}

export async function getCurrentTask() {
  const ret: T.TaskDbEntry = {
    task: {
      title: 'testtitle',
      description: 'test-description',
      startt: 12345,
      endt: null,
    },
  };
  return ret;
}
