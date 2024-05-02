import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { MainService } from './main.service';

@UseGuards(AuthGuard)
@Controller('main')
export class MainController {
  constructor(private readonly service: MainService) {}

  @Get('dashboard')
  async getDashboard() {
    return await this.service.getDashboard();
  }
}
