import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { setDynamic } from './dynamicScope';
import { getCurrentTimestamp } from './time';
import * as T from './task.types';

jest.mock('./task.dbapi');

describe('TaskController', () => {
  let taskController: TaskController;

  beforeEach(async () => {
    const task: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    taskController = task.get<TaskController>(TaskController);
  });

  describe('/start_task', () => {
    it('does not throw on "?title=task1&description=test1"', async () => {
      const result = await taskController.startTask('task1', 'test1');
      expect(result);
    });

    it('does not throw on "?title=task1"', async () => {
      const result = await taskController.startTask('task1', undefined);
      expect(result);
    });

    it('returns statusCode:200 on "?title=task1&description=test1"', async () => {
      const result = await taskController.startTask('task1', 'test1');
      expect(result.statusCode).toBe(200);
    });
  });

  describe('/stop_task', () => {
    it('does not throw on empty query', async () => {
      const stop = await taskController.stopTask();
      expect(stop);
    });

    it('returns statusCode:200 on empty query', async () => {
      const stop = await taskController.stopTask();
      expect(stop.statusCode).toBe(200);
    });
  });

  describe('/get_current_task', () => {
    it('does not throw on empty query', async () => {
      const result = await taskController.getCurrentTask();
      expect(result);
    });

    it('returns statusCode:200 on empty query', async () => {
      const result = await taskController.getCurrentTask();
      expect(result.statusCode).toBe(200);
    });
  });
});

describe('Stateful TaskController', () => {
  let taskController: TaskController;

  beforeEach(async () => {
    const task: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    taskController = task.get<TaskController>(TaskController);
  });

  let dbState = [];
  let submitted = null;

  function startTaskHook(title, description) {
    submitted = [title, description, getCurrentTimestamp(), null];
    dbState.push(submitted);
  }

  const startTaskBody = (done) => () => {
    taskController.startTask('task1', 'test1').then((result) => {
      expect(result.statusCode).toBe(200);
      expect(dbState.length).toBe(1);
      done();
    });
  };

  it('writes sumbits tasks to database', (done) => {
    setDynamic('startTaskHook', startTaskHook, startTaskBody(done));
  });

  function getCurrentTaskHook() {
    const currentt = getCurrentTimestamp();
    for (const [title, description, startt, endt] of dbState) {
      if (endt === null && currentt >= startt) {
        return [title, description, startt, endt];
      }
    }
  }

  const getCurrentTaskBody = (done) => () => {
    taskController.getCurrentTask().then((result) => {
      const got = JSON.stringify(result);
      const want = JSON.stringify({ statusCode: 200, ...submitted });
      expect(got).toBe(want);

      expect(result.statusCode).toBe(200);
      expect(dbState.length).toBe(1);
      done();
    });
  };

  it('retrieves correct value after startTask', (done) => {
    setDynamic(
      'getCurrentTaskHook',
      getCurrentTaskHook,
      getCurrentTaskBody(done),
    );
  });

  function stopTaskHook() {
    dbState = dbState.filter((x) => x[4] !== submitted[4]);
    return T.DbStopTaskStatus.OK;
  }

  const stopTaskBody = (done) => () => {
    taskController.stopTask().then((result) => {
      expect(result.statusCode).toBe(200);
      expect(dbState.length).toBe(0);
      done();
    });
  };

  it('removes task from database on stopTask request', (done) => {
    setDynamic('stopTaskHook', stopTaskHook, stopTaskBody(done));
  });
});
