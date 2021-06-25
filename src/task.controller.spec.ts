import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

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
