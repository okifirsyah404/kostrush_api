import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoHashService } from '../crypto-hash.service';
import { DatabaseService } from '../database/database.service';
import { MainLogger } from '../logger/logger.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DatabaseService)
    private readonly prisma: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly logger: MainLogger,
  ) {}

  async signIn(dto: SignInDto) {
    const cryptoHashService = new CryptoHashService();

    if (!dto.email || !dto.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const account = await this.prisma.account.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    this.logger.log('Account', JSON.stringify(account));
    this.logger.log('Dto', JSON.stringify(dto));

    if (!account || !account.user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordMatched = await cryptoHashService.comparePassword(
      dto.password,
      account.password,
    );

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Password does not match');
    }

    const accessToken = this.jwtService.sign({
      id: account.user.id,
    });

    return {
      accessToken,
    };
  }
}
