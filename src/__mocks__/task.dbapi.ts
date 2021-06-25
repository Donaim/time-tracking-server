import * as T from '../task.types';

export async function startTask() {
  return null;
}

export async function stopTask() {
  return { body: { kind: T.DbStopTaskStatusKind.OK } };
}

export async function getCurrentTask() {
  const ret: T.TaskDbEntry = {
    task: {
      name: 'testname',
      description: 'test-description',
      startt: 12345,
      endt: null,
    },
  };
  return ret;
}
