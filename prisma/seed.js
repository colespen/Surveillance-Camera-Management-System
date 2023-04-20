import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// 
const userData = [
  {
    name: 'Laya',
    email: 'laya@somewhere.io',
  },
  {
    name: 'Bolo',
    email: 'bolo@somewhere.io',
  },
  {
    name: 'Rick',
    email: 'rick@somewhere.io',
  },
  {
    name: 'Admin',
    email: 'admin@admin.com',
  },
];
// TODO: TS Interface
const cameraData = [
  {
    name: 'corridor 1',
    location: "NE Corridor"
  },
  {
    name: 'corridor 2',
    location: "NW Corridor"
  },
  {
    name: 'loading bay',
    location: "Front St. loading Bay"
  },
  {
    name: 'front entrance',
    location: "2357 Main St."
  },
];
const videoData = [
  {
    cameraId: 3,
    url: 'https://surveillance-management-system.s3.us-east-2.amazonaws.com/loading-bay-1.mov',
    duration: '00:00:50',
  },
];

async function main() {
  console.log(`begin the deleting ...`);

  await prisma.video.deleteMany();
  await prisma.camera.deleteMany();
  await prisma.user.deleteMany();

  await prisma.$executeRaw`ALTER SEQUENCE "videos_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "cameras_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "users_id_seq" RESTART WITH 1`;

  console.log(`begin the seeding ...`);

  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  for (const c of cameraData) {
    const camera = await prisma.camera.create({
      data: c,
    });
    console.log(`Created camera with id: ${camera.id}`);
  }

  for (const v of videoData) {
    const video = await prisma.video.create({
      data: v,
    });
    console.log(`Created video with id: ${video.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
