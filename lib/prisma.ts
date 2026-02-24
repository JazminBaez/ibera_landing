import { PrismaClient } from '@/lib/generated/prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createClient() {
  return new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL!,
  });
}

export const prisma = globalForPrisma.prisma || createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;