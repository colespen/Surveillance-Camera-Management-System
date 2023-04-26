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
    name: 'loading bay',
    location: "Front St. loading Bay"
  },
  {
    name: 'rear entrance',
    location: "2357 Main St."
  },
  {
    name: 'rear entrance overhead',
    location: "2357 Main St."
  },
  {
    name: 'corridor 1',
    location: "NE Corridor"
  },
  {
    name: 'corridor 2',
    location: "NW Corridor"
  },
  {
    name: 'front entrance',
    location: "2357 Main St."
  },
];
const videoData = [
  {
    cameraId: 1,
    url: 'https://dunz8t440z7z8.cloudfront.net/loading-bay-1.mp4',
    duration: '00:00:50',
  },
  {
    cameraId: 1,
    url: 'https://dunz8t440z7z8.cloudfront.net/loading-bay-2.mp4',
    duration: '00:00:50',
  },
  {
    cameraId: 1,
    url: 'https://dunz8t440z7z8.cloudfront.net/loading-bay-3.mp4',
    duration: '00:00:50',
  },
  {
    cameraId: 2,
    url: 'https://dunz8t440z7z8.cloudfront.net/rear-entrance-no-mic.mp4',
    duration: '00:00:50',
  },
  {
    cameraId: 3,
    url: 'https://dunz8t440z7z8.cloudfront.net/rear-entrance-overhead.mp4',
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
