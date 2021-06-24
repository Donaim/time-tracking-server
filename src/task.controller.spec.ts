import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

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
    it('does not throw on "?name=task1&description=test1"', () => {
      expect(taskController.getStartTask('task1', 'test1'));
    });

    it('does not throw on "?name=task1"', () => {
      expect(taskController.getStartTask('task1', 'test1'));
    });

    it('returns statusCode:200 on "?name=task1&description=test1"', () => {
      expect(taskController.getStartTask('task1', 'test1').statusCode).toBe(
        200,
      );
    });
  });
});
