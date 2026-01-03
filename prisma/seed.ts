// index.ts
// Query your database using the Prisma Client

import 'dotenv/config'
import { PrismaClient } from '@/generated/prisma';
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// Example query to create a user based on the example schema

async function main() {
  const user = await prisma.task.create({
    data: {
      title: 'Alice',
      description: 'Alice is a user',
    },
  })

  console.log(user)
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

