import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string(),
  limitMonth: z.number(),
})

export type CreateCategoryDto = z.infer<typeof createCategorySchema>;