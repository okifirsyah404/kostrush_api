import { Prisma, PrismaClient, TransactionStatus } from '@prisma/client';

export async function seedTransaction(prisma: PrismaClient) {
  try {
    const dormitories = await prisma.dormitory.findMany({
      select: {
        id: true,
        availableRoom: true,
        dormitoryImage: true,
        dormitoryPrice: {
          select: {
            price: true,
          },
        },
      },
    });

    const user = await prisma.user.findFirst({
      select: {
        id: true,
      },
    });

    const baseDate = new Date();

    const transactionTimes: Prisma.TransactionTimeCreateInput[] = [
      {
        checkIn: baseDate,
        checkOut: new Date(baseDate.setMonth(baseDate.getMonth() + 1)),
        durationMonth: 1,
      },
      {
        checkIn: baseDate,
        checkOut: new Date(baseDate.setMonth(baseDate.getMonth() + 5)),
        durationMonth: 5,
      },
      {
        checkIn: baseDate,
        checkOut: new Date(baseDate.setMonth(baseDate.getMonth() + 6)),
        durationMonth: 6,
      },
      {
        checkIn: baseDate,
        checkOut: new Date(baseDate.setMonth(baseDate.getMonth() + 4)),
        durationMonth: 4,
      },
    ];

    const status = [
      TransactionStatus.DONE,
      TransactionStatus.PENDING,
      TransactionStatus.PROCESSING,
      TransactionStatus.DONE,
    ];

    const transactions: Prisma.TransactionCreateInput[] = transactionTimes.map(
      (time, index) => ({
        dormitory: {
          connect: {
            id: dormitories[index].id,
          },
        },
        status: status[index],
        user: {
          connect: {
            id: user?.id,
          },
        },
        totalPrice:
          dormitories[index].dormitoryPrice?.price !== undefined
            ? dormitories[index].dormitoryPrice!.price * time.durationMonth
            : 0,
        transactionEvidence: {
          create: {
            url: '/public/kost/kost1.jpg',
          },
        },
        transactionTime: {
          create: time,
        },
      }),
    );

    for await (const transaction of transactions) {
      await prisma.transaction.create({
        data: transaction,
      });
    }

    console.log('Transaction seeded!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
