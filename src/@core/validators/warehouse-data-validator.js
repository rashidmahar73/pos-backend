import { z } from "zod";

export const warehouseSchema = z.object({
  email: z.string().email(),
});
