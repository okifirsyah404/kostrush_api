import { PrismaClient } from '@prisma/client';
import { clearDb } from './clear-db';

const prisma = new PrismaClient();

clearDb(prisma)
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
