import { Test, TestingModule } from '@nestjs/testing';
import { DormitoryController } from './dormitory.controller';
import { DormitoryService } from './dormitory.service';

describe('DormitoryController', () => {
  let controller: DormitoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DormitoryController],
      providers: [DormitoryService],
    }).compile();

    controller = module.get<DormitoryController>(DormitoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
