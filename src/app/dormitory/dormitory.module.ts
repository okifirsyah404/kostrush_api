import { Module } from '@nestjs/common';
import { DormitoryService } from './dormitory.service';
import { DormitoryController } from './dormitory.controller';

@Module({
  controllers: [DormitoryController],
  providers: [DormitoryService],
})
export class DormitoryModule {}
