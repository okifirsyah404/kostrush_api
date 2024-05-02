import { Body, Controller, Post } from '@nestjs/common';
import { BaseResponse } from '../base-response';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() dto: SignInDto) {
    const data = await this.service.signIn(dto);

    return BaseResponse.created({
      data,
      message: 'Sign in success',
    });
  }
}
