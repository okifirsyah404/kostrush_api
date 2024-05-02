import { PrismaClient } from '@prisma/client';
import { CryptoHashService } from 'src/app/crypto-hash.service';

export async function seedUser(prisma: PrismaClient, hash: CryptoHashService) {
  try {
    const account = await prisma.account.create({
      data: {
        email: 'johndoe@kostrush.com',
        password: await hash.hashPassword('johndoe@kostrush.com'),
      },
    });

    const profile = await prisma.profile.create({
      data: {
        name: 'John Doe',
        address: 'Nganjuk',
        phoneNumber: '081234567890',
        occupation: 'Software Engineer',
      },
    });

    await prisma.user.create({
      data: {
        account: {
          connect: {
            id: account.id,
          },
        },
        profile: {
          connect: {
            id: profile.id,
          },
        },
      },
    });

    console.log('User seeded!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
