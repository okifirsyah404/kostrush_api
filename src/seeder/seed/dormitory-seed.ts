import {
  DormitoryGender,
  DormitoryType,
  Prisma,
  PrismaClient,
} from '@prisma/client';

export async function seedDormitory(prisma: PrismaClient) {
  try {
    const owner = await prisma.owner.create({
      data: {
        profile: {
          create: {
            name: 'Pak Joyo',
            address: 'Nganjuk',
            occupation: 'Wirausaha',
            phoneNumber: '+6281913236990',
          },
        },
      },
    });

    const dormitoryFacility: Prisma.DormitoryFacilityCreateInput = {
      airConditioner: true,
      bathroom: true,
      bed: true,
      pillow: true,
      roomLength: 3,
      roomWidth: 4,
      wardrobe: true,
      wifi: true,
    };

    const dormitoryBathFacility: Prisma.DormitoryBathFacilityCreateInput = {
      shower: true,
      sink: true,
      toilet: true,
    };

    const dormitoryLocation: Prisma.DormitoryLocationCreateInput = {
      address:
        'Jl. Letnan Jenderal Suprapto No.197, Jatirejo, Kec. Nganjuk, Kabupaten Nganjuk, Jawa Timur 64416',
      latitude: -7.616109,
      longitude: 111.886453,
      sublocality: 'Jatirejo',
    };

    const dormitoryRules: Prisma.DormitoryRulesCreateInput = {
      isCoupleAllowed: true,
      isGuestAllowed: true,
      isGuestOtherGenderAllowed: true,
      isPetAllowed: true,
      isSmokingAllowed: true,
      maxPeople: 3,
      maxGuestVisitTime: new Date('1970-01-01T22:00:00+07:00'),
    };

    const dormitory: Prisma.DormitoryCreateInput[] = [
      {
        name: 'Kost Joyo',
        availableRoom: 3,
        dormitoryGender: DormitoryGender.MALE,
        dormitoryType: DormitoryType.REGULAR,
        owner: {
          connect: {
            id: owner.id,
          },
        },
        dormitoryBathFacility: {
          create: dormitoryBathFacility,
        },
        dormitoryRules: {
          create: dormitoryRules,
        },
        dormitoryLocation: {
          create: dormitoryLocation,
        },
        dormitoryFacility: {
          create: dormitoryFacility,
        },
        dormitoryPrice: {
          create: {
            price: 1000000,
            depositPrice: 500000,
          },
        },
      },
      {
        name: 'Kost Samsul',
        availableRoom: 2,
        dormitoryGender: DormitoryGender.MALE,
        dormitoryType: DormitoryType.REGULAR,
        owner: {
          connect: {
            id: owner.id,
          },
        },
        dormitoryBathFacility: {
          create: dormitoryBathFacility,
        },
        dormitoryRules: {
          create: dormitoryRules,
        },
        dormitoryLocation: {
          create: dormitoryLocation,
        },
        dormitoryFacility: {
          create: dormitoryFacility,
        },
        dormitoryPrice: {
          create: {
            price: 600000,
            depositPrice: 200000,
          },
        },
      },
      {
        name: 'Kost Budi',
        availableRoom: 10,
        dormitoryGender: DormitoryGender.MALE,
        dormitoryType: DormitoryType.REGULAR,
        owner: {
          connect: {
            id: owner.id,
          },
        },
        dormitoryBathFacility: {
          create: dormitoryBathFacility,
        },
        dormitoryRules: {
          create: dormitoryRules,
        },
        dormitoryLocation: {
          create: dormitoryLocation,
        },
        dormitoryFacility: {
          create: dormitoryFacility,
        },
        dormitoryPrice: {
          create: {
            price: 400000,
            depositPrice: 200000,
          },
        },
      },
      {
        name: 'Kost Forest IV',
        availableRoom: 10,
        dormitoryGender: DormitoryGender.UNISEX,
        dormitoryType: DormitoryType.REGULAR,
        owner: {
          connect: {
            id: owner.id,
          },
        },
        dormitoryBathFacility: {
          create: dormitoryBathFacility,
        },
        dormitoryRules: {
          create: dormitoryRules,
        },
        dormitoryLocation: {
          create: dormitoryLocation,
        },
        dormitoryFacility: {
          create: dormitoryFacility,
        },
        dormitoryPrice: {
          create: {
            price: 900000,
            depositPrice: 500000,
          },
        },
      },
      {
        name: 'Kost Kenanga IV',
        availableRoom: 4,
        dormitoryGender: DormitoryGender.FEMALE,
        dormitoryType: DormitoryType.PREMIUM,
        owner: {
          connect: {
            id: owner.id,
          },
        },
        dormitoryBathFacility: {
          create: dormitoryBathFacility,
        },
        dormitoryRules: {
          create: dormitoryRules,
        },
        dormitoryLocation: {
          create: dormitoryLocation,
        },
        dormitoryFacility: {
          create: dormitoryFacility,
        },
        dormitoryPrice: {
          create: {
            price: 1000000,
            depositPrice: 500000,
          },
        },
      },
      {
        name: 'Kost Kenanga III',
        availableRoom: 7,
        dormitoryGender: DormitoryGender.FEMALE,
        dormitoryType: DormitoryType.PREMIUM,
        owner: {
          connect: {
            id: owner.id,
          },
        },
        dormitoryBathFacility: {
          create: dormitoryBathFacility,
        },
        dormitoryRules: {
          create: dormitoryRules,
        },
        dormitoryLocation: {
          create: dormitoryLocation,
        },
        dormitoryFacility: {
          create: dormitoryFacility,
        },
        dormitoryPrice: {
          create: {
            price: 1000000,
            depositPrice: 500000,
          },
        },
      },
      {
        name: 'Kost Adiputra I',
        availableRoom: 7,
        dormitoryGender: DormitoryGender.MALE,
        dormitoryType: DormitoryType.REGULAR,
        owner: {
          connect: {
            id: owner.id,
          },
        },
        dormitoryBathFacility: {
          create: dormitoryBathFacility,
        },
        dormitoryRules: {
          create: dormitoryRules,
        },
        dormitoryLocation: {
          create: dormitoryLocation,
        },
        dormitoryFacility: {
          create: dormitoryFacility,
        },
        dormitoryPrice: {
          create: {
            price: 400000,
            depositPrice: 20000,
          },
        },
      },
      {
        name: 'Kost Adiputra I',
        availableRoom: 7,
        dormitoryGender: DormitoryGender.MALE,
        dormitoryType: DormitoryType.REGULAR,
        owner: {
          connect: {
            id: owner.id,
          },
        },
        dormitoryBathFacility: {
          create: dormitoryBathFacility,
        },
        dormitoryRules: {
          create: dormitoryRules,
        },
        dormitoryLocation: {
          create: dormitoryLocation,
        },
        dormitoryFacility: {
          create: dormitoryFacility,
        },
        dormitoryPrice: {
          create: {
            price: 500000,
            depositPrice: 200000,
          },
        },
      },
      {
        name: 'Kost Adiputra II',
        availableRoom: 7,
        dormitoryGender: DormitoryGender.MALE,
        dormitoryType: DormitoryType.PREMIUM,
        owner: {
          connect: {
            id: owner.id,
          },
        },
        dormitoryBathFacility: {
          create: dormitoryBathFacility,
        },
        dormitoryRules: {
          create: dormitoryRules,
        },
        dormitoryLocation: {
          create: dormitoryLocation,
        },
        dormitoryFacility: {
          create: dormitoryFacility,
        },
        dormitoryPrice: {
          create: {
            price: 1000000,
            depositPrice: 500000,
          },
        },
      },
      {
        name: 'Kost Akasia I',
        availableRoom: 4,
        dormitoryGender: DormitoryGender.UNISEX,
        dormitoryType: DormitoryType.PREMIUM,
        owner: {
          connect: {
            id: owner.id,
          },
        },
        dormitoryBathFacility: {
          create: dormitoryBathFacility,
        },
        dormitoryRules: {
          create: dormitoryRules,
        },
        dormitoryLocation: {
          create: dormitoryLocation,
        },
        dormitoryFacility: {
          create: dormitoryFacility,
        },
        dormitoryPrice: {
          create: {
            price: 2000000,
            depositPrice: 800000,
          },
        },
      },
    ];

    for await (const data of dormitory) {
      await prisma.dormitory.create({
        data,
      });
    }

    console.log('Dormitory seeded!');

    return dormitory;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
