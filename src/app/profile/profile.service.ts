import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProfileService {
  constructor(private readonly database: DatabaseService) {}

  async getProfile(userId: string) {
    const profile = await this.database.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        profile: {
          select: {
            id: true,
            name: true,
            address: true,
            phoneNumber: true,
            occupation: true,
            imageAvatar: true,
          },
        },
        account: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }
}
