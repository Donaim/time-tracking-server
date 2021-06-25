import * as T from '../task.types';

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
