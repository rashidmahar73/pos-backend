import { PrismaClient } from "@prisma/client";

const dbClient = new PrismaClient({
  log: ["error", "info"],
});

export default dbClient;
