import { PrismaClient } from "@prisma/client";

const dbClient = new PrismaClient({
  omit: {
    profile: {
      role_id: true,
    },
    staff: {
      role_id: true,
    },
    categories: {
      brand_id: true,
    },
  },
  log: ["error", "info"],
});

export default dbClient;
