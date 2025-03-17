import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const dbClient =  globalForPrisma.prisma ?? new PrismaClient({ 
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty'
});

// const globalForPrisma = global as unknown as { prisma?: PrismaClient };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = dbClient;


export default dbClient;
