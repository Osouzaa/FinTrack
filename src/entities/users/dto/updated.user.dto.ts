import { z } from "zod";

export const updatedUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  password: z.string().min(6).optional(),
})

export type UpdatedUserDto = z.infer<typeof updatedUserSchema>