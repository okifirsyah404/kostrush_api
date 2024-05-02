import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseResponse } from '../base-response';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class DormitoryService {
  constructor(private readonly database: DatabaseService) {}

  async searchDormitory(userId: string, searchQuery: string) {
    const user = await this.database.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const dormitories = await this.database.dormitory.findMany({
      where: {
        name: {
          contains: searchQuery,
        },
      },
      select: {
        id: true,
        name: true,
        availableRoom: true,
        dormitoryGender: true,
        dormitoryType: true,
        dormitoryFacility: {
          select: {
            id: true,
            airConditioner: true,
            bathroom: true,
            bed: true,
            pillow: true,
            roomHeight: true,
            roomLength: true,
            roomWidth: true,
            wardrobe: true,
            wifi: true,
          },
        },
        dormitoryBathFacility: {
          select: {
            id: true,
            shower: true,
            toilet: true,
            sink: true,
          },
        },
        dormitoryRules: {
          select: {
            id: true,
            isCoupleAllowed: true,
            isGuestAllowed: true,
            isGuestOtherGenderAllowed: true,
            isPetAllowed: true,
            isSmokingAllowed: true,
            maxGuestVisitTime: true,
            maxPeople: true,
          },
        },
        dormitoryLocation: {
          select: {
            id: true,
            address: true,
            latitude: true,
            longitude: true,
            sublocality: true,
          },
        },
        dormitoryImage: {
          select: {
            id: true,
            url: true,
          },
        },
        dormitoryPrice: {
          select: {
            id: true,
            price: true,
            depositPrice: true,
          },
        },
        owner: {
          select: {
            id: true,
            profile: {
              select: {
                id: true,
                name: true,
                phoneNumber: true,
                occupation: true,
                address: true,
                imageAvatar: true,
              },
            },
          },
        },
      },
    });

    return BaseResponse.ok({
      data: dormitories,
    });
  }

  async dormitoryBySubLocality(userId: string, sublocality: string) {
    const user = await this.database.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const dormitories = await this.database.dormitory.findMany({
      where: {
        dormitoryLocation: {
          sublocality: {
            equals: sublocality,
          },
        },
      },
      select: {
        id: true,
        name: true,
        availableRoom: true,
        dormitoryGender: true,
        dormitoryType: true,
        dormitoryFacility: {
          select: {
            id: true,
            airConditioner: true,
            bathroom: true,
            bed: true,
            pillow: true,
            roomHeight: true,
            roomLength: true,
            roomWidth: true,
            wardrobe: true,
            wifi: true,
          },
        },
        dormitoryBathFacility: {
          select: {
            id: true,
            shower: true,
            toilet: true,
            sink: true,
          },
        },
        dormitoryRules: {
          select: {
            id: true,
            isCoupleAllowed: true,
            isGuestAllowed: true,
            isGuestOtherGenderAllowed: true,
            isPetAllowed: true,
            isSmokingAllowed: true,
            maxGuestVisitTime: true,
            maxPeople: true,
          },
        },
        dormitoryLocation: {
          select: {
            id: true,
            address: true,
            latitude: true,
            longitude: true,
            sublocality: true,
          },
        },
        dormitoryImage: {
          select: {
            id: true,
            url: true,
          },
        },
        dormitoryPrice: {
          select: {
            id: true,
            price: true,
            depositPrice: true,
          },
        },
        owner: {
          select: {
            id: true,
            profile: {
              select: {
                id: true,
                name: true,
                phoneNumber: true,
                occupation: true,
                address: true,
                imageAvatar: true,
              },
            },
          },
        },
      },
    });

    return BaseResponse.ok({
      data: dormitories,
    });
  }

  async getDormitory(userId: string, dormitoryId: string) {
    const user = await this.database.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const dormitory = await this.database.dormitory.findUnique({
      where: {
        id: dormitoryId,
      },
      select: {
        id: true,
        name: true,
        availableRoom: true,
        dormitoryGender: true,
        dormitoryType: true,
        dormitoryFacility: {
          select: {
            id: true,
            airConditioner: true,
            bathroom: true,
            bed: true,
            pillow: true,
            roomHeight: true,
            roomLength: true,
            roomWidth: true,
            wardrobe: true,
            wifi: true,
          },
        },
        dormitoryBathFacility: {
          select: {
            id: true,
            shower: true,
            toilet: true,
            sink: true,
          },
        },
        dormitoryRules: {
          select: {
            id: true,
            isCoupleAllowed: true,
            isGuestAllowed: true,
            isGuestOtherGenderAllowed: true,
            isPetAllowed: true,
            isSmokingAllowed: true,
            maxGuestVisitTime: true,
            maxPeople: true,
          },
        },
        dormitoryLocation: {
          select: {
            id: true,
            address: true,
            latitude: true,
            longitude: true,
            sublocality: true,
          },
        },
        dormitoryImage: {
          select: {
            id: true,
            url: true,
          },
        },
        dormitoryPrice: {
          select: {
            id: true,
            price: true,
            depositPrice: true,
          },
        },
        owner: {
          select: {
            id: true,
            profile: {
              select: {
                id: true,
                name: true,
                phoneNumber: true,
                occupation: true,
                address: true,
                imageAvatar: true,
              },
            },
          },
        },
      },
    });

    return BaseResponse.ok({
      data: dormitory,
    });
  }
}
