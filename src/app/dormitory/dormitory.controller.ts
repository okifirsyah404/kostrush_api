import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { DormitoryService } from './dormitory.service';

@UseGuards(AuthGuard)
@Controller('dormitory')
export class DormitoryController {
  constructor(private readonly dormitoryService: DormitoryService) {}

  @Get('search')
  async searchDormitory(@Req() req: any, @Query('q') searchQuery: string) {
    const userId = req.payload.id;

    return await this.dormitoryService.searchDormitory(userId, searchQuery);
  }

  @Get('sublocality/:sublocality')
  async dormitoryBySubLocality(
    @Req() req: any,
    @Param('sublocality') sublocality: string,
  ) {
    const userId = req.payload.id;

    return await this.dormitoryService.dormitoryBySubLocality(
      userId,
      sublocality,
    );
  }

  @Get(':id')
  async getDormitoryById(@Req() req: any, @Param('id') dormId: string) {
    const userId = req.payload.id;

    return await this.dormitoryService.getDormitory(userId, dormId);
  }
}
