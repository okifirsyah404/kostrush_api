import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import { join } from 'path';

const basePaths = join(__dirname, '..', '..', '..', 'public');

const baseSeedPaths = join(__dirname, '..', '..', '..', 'public_seeder');

export async function seedImage(prisma: PrismaClient) {
  await seedUserImage(prisma);
  await seedDormitoryImage(prisma);
}

async function seedUserImage(prisma: PrismaClient) {
  try {
    const imagePaths = join(basePaths, 'profile');

    if (!fs.existsSync(basePaths)) {
      fs.mkdir(basePaths, (err) => {
        if (err) {
          throw err;
        }
      });
    }

    if (!fs.existsSync(imagePaths)) {
      fs.mkdir(imagePaths, (err) => {
        if (err) {
          throw err;
        }
      });
    } else {
      fs.readdirSync(imagePaths).forEach((file) => {
        fs.unlinkSync(join(imagePaths, file));
      });
    }

    await prisma.user
      .findMany({
        select: {
          id: true,
          profile: true,
        },
      })
      .then(async (users) => {
        for await (const user of users) {
          const userImagePaths = join(imagePaths, user.id);

          if (!fs.existsSync(userImagePaths)) {
            fs.mkdir(userImagePaths, (err) => {
              if (err) {
                throw err;
              }
            });
          } else {
            fs.readdirSync(userImagePaths).forEach((file) => {
              fs.unlinkSync(join(userImagePaths, file));
            });
          }

          fs.copyFile(
            join(baseSeedPaths, 'profile', 'profile_placeholder.png'),
            join(userImagePaths, `${user.id}.png`),
            (err) => {
              if (err) {
                throw err;
              }
            },
          );

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              profile: {
                update: {
                  imageAvatar: `/public/profile/${user.id}/${user.id}.png`,
                },
              },
            },
          });

          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        console.log('Seed user image complete');
      })
      .catch((error) => {
        throw error;
      });
  } catch (error: any) {
    console.log(
      "------------- There's an error when seeding user image data -------------",
    );
    throw error;
  }
}

async function seedDormitoryImage(prisma: PrismaClient) {
  try {
    const imagePaths = join(basePaths, 'kost');

    if (!fs.existsSync(imagePaths)) {
      fs.mkdir(imagePaths, (err) => {
        if (err) {
          throw err;
        }
      });
    } else {
      fs.readdirSync(imagePaths).forEach((file) => {
        fs.unlinkSync(join(imagePaths, file));
      });
    }

    await prisma.dormitory
      .findMany({
        select: {
          id: true,
        },
      })
      .then(async (dormitories) => {
        for await (const dormitory of dormitories) {
          const dormitoryImagePaths = join(imagePaths, dormitory.id);

          if (!fs.existsSync(dormitoryImagePaths)) {
            fs.mkdir(dormitoryImagePaths, (err) => {
              if (err) {
                throw err;
              }
            });
          } else {
            fs.readdirSync(dormitoryImagePaths).forEach((file) => {
              fs.unlinkSync(join(dormitoryImagePaths, file));
            });
          }

          const placeHolderImages = fs.readdirSync(join(baseSeedPaths, 'kost'));

          for await (const image of placeHolderImages) {
            fs.copyFile(
              join(baseSeedPaths, 'kost', image),
              join(dormitoryImagePaths, image),
              (err) => {
                if (err) {
                  throw err;
                }
              },
            );

            await prisma.dormitoryImage.create({
              data: {
                url: `/public/kost/${dormitory.id}/${image}`,
                dormitory: {
                  connect: {
                    id: dormitory.id,
                  },
                },
              },
            });

            await new Promise((resolve) => setTimeout(resolve, 100));
          }

          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        console.log('Seed dormitory image complete');
      })
      .catch((error) => {
        throw error;
      });
  } catch (error: any) {
    console.log(
      "------------- There's an error when seeding dormitory image data -------------",
    );
    throw error;
  }
}
