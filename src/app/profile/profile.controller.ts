import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { BaseResponse } from '../base-response';
import { ProfileService } from './profile.service';

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  async getProfile(@Req() req: any) {
    const id = req.payload.id;

    const data = await this.service.getProfile(id);

    return BaseResponse.ok({
      data,
      message: 'Profile found',
    });
  }
}
