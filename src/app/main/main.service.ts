import { Injectable } from '@nestjs/common';
import { BaseResponse } from '../base-response';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MainService {
  constructor(private readonly database: DatabaseService) {}

  async getDashboard() {
    const recomendedDormitories = await this.database.dormitory.findMany({
      take: 4,
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

    let cheapestDormitories = await this.database.dormitory.findMany({
      take: 4,
      skip: 2,
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

    cheapestDormitories = cheapestDormitories.sort((a, b) => {
      return a.dormitoryPrice!.price - b.dormitoryPrice!.price;
    });

    return BaseResponse.ok({
      data: {
        recomendedDormitories,
        cheapestDormitories,
      },
    });
  }
}
