import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseResponse } from '../base-response';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TransactionService {
  constructor(private readonly database: DatabaseService) {}

  async getTransactions(userId: string) {
    const user = await this.database.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const transactions = await this.database.transaction.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        totalPrice: true,
        status: true,
        transactionTime: {
          select: {
            checkIn: true,
            checkOut: true,
            durationMonth: true,
          },
        },
        transactionEvidence: {
          select: {
            id: true,
            url: true,
          },
        },
        dormitory: {
          select: {
            id: true,
            name: true,
            availableRoom: true,
            dormitoryType: true,
            dormitoryGender: true,
            dormitoryLocation: {
              select: {
                address: true,
                latitude: true,
                longitude: true,
                sublocality: true,
              },
            },
            dormitoryFacility: {
              select: {
                airConditioner: true,
                bathroom: true,
                bed: true,
                pillow: true,
                roomHeight: true,
                roomLength: true,
                roomWidth: true,
                wifi: true,
                wardrobe: true,
              },
            },
            dormitoryImage: {
              select: {
                id: true,
                url: true,
              },
            },
            dormitoryBathFacility: {
              select: {
                id: true,
                shower: true,
                sink: true,
                toilet: true,
              },
            },
            dormitoryPrice: {
              select: {
                id: true,
                price: true,
                depositPrice: true,
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
            owner: {
              select: {
                id: true,
                profile: {
                  select: {
                    name: true,
                    address: true,
                    phoneNumber: true,
                    occupation: true,
                    imageAvatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return BaseResponse.ok({
      data: transactions,
    });
  }

  async getTransaction(userId: string, transactionId: string) {
    const user = await this.database.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const transaction = await this.database.transaction.findUnique({
      where: {
        id: transactionId,
        userId: user.id,
      },
      select: {
        id: true,
        totalPrice: true,
        status: true,
        transactionTime: {
          select: {
            checkIn: true,
            checkOut: true,
            durationMonth: true,
          },
        },
        transactionEvidence: {
          select: {
            id: true,
            url: true,
          },
        },
        dormitory: {
          select: {
            id: true,
            name: true,
            availableRoom: true,
            dormitoryType: true,
            dormitoryGender: true,
            dormitoryLocation: {
              select: {
                address: true,
                latitude: true,
                longitude: true,
                sublocality: true,
              },
            },
            dormitoryFacility: {
              select: {
                airConditioner: true,
                bathroom: true,
                bed: true,
                pillow: true,
                roomHeight: true,
                roomLength: true,
                roomWidth: true,
                wifi: true,
                wardrobe: true,
              },
            },
            dormitoryImage: {
              select: {
                id: true,
                url: true,
              },
            },
            dormitoryBathFacility: {
              select: {
                id: true,
                shower: true,
                sink: true,
                toilet: true,
              },
            },
            dormitoryPrice: {
              select: {
                id: true,
                price: true,
                depositPrice: true,
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
            owner: {
              select: {
                id: true,
                profile: {
                  select: {
                    name: true,
                    address: true,
                    phoneNumber: true,
                    occupation: true,
                    imageAvatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return BaseResponse.ok({
      data: transaction,
    });
  }
}
