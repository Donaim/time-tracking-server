import * as T from '../task.types';
import { getDynamic } from '../dynamicScope';

export async function startTask(title: string, description: string | null) {
  const hook = getDynamic('startTaskHook');
  if (hook) {
    return hook(title, description);
  }
  return null;
}

export async function stopTask() {
  const hook = getDynamic('stopTaskHook');
  if (hook) {
    return hook();
  }
  return T.DbStopTaskStatus.OK;
}

export async function getCurrentTask() {
  const hook = getDynamic('getCurrentTaskHook');
  if (hook) {
    return hook();
  }

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
