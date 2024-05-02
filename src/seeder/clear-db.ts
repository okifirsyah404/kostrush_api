import { PrismaClient } from '@prisma/client';

export async function clearDb(prisma: PrismaClient) {
  console.log('Clearing database...');

  console.log('Clearing dormitoryBathFacility table...');
  await prisma.dormitoryBathFacility.deleteMany();

  console.log('Clearing dormitoryFacility table...');
  await prisma.dormitoryFacility.deleteMany();

  console.log('Clearing dormitoryImage table...');
  await prisma.dormitoryImage.deleteMany();

  console.log('Clearing dormitoryLocation table...');
  await prisma.dormitoryLocation.deleteMany();

  console.log('Clearing dormitoryPrice table...');
  await prisma.dormitoryPrice.deleteMany();

  console.log('Clearing dormitoryRules table...');
  await prisma.dormitoryRules.deleteMany();

  console.log('Clearing transaction table...');
  await prisma.transaction.deleteMany();

  console.log('Clearing transactionEvidence table...');
  await prisma.transactionEvidence.deleteMany();

  console.log('Clearing transactionTime table...');
  await prisma.transactionTime.deleteMany();

  console.log('Clearing user table...');
  await prisma.user.deleteMany();

  console.log('Clearing account table...');
  await prisma.account.deleteMany();

  console.log('Clearing otp table...');
  await prisma.otp.deleteMany();

  console.log('Clearing owner table...');
  await prisma.owner.deleteMany();

  console.log('Clearing profile table...');
  await prisma.profile.deleteMany();

  console.log('Clearing dormitory table...');
  await prisma.dormitory.deleteMany();

  console.log('Database cleared!');
}
