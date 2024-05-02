import { PrismaClient } from '@prisma/client';
import { CryptoHashService } from './../app/crypto-hash.service';
import { clearDb } from './clear-db';
import { seedDormitory } from './seed/dormitory-seed';
import { seedImage } from './seed/image-seed';
import { seedTransaction } from './seed/transaction-seed';
import { seedUser } from './seed/user-seed';

const prisma = new PrismaClient();

const cryptoHash = new CryptoHashService();

export async function seed() {
  await clearDb(prisma).catch((error) => {
    console.error(error);
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await seedUser(prisma, cryptoHash).catch((error) => {
    console.error(error);
  });

  await seedDormitory(prisma).catch((error) => {
    console.error(error);
  });

  await seedTransaction(prisma).catch((error) => {
    console.error(error);
  });

  await seedImage(prisma).catch((error) => {
    console.error(error);
  });
}
