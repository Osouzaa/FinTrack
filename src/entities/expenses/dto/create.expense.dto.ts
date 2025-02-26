import { z } from "zod";

export const createExpenseSchema = z.object({
  amount:  z.number(), 
  date: z.string(),
  isInstallment: z.boolean(),
  installmentCount: z.number().optional(),
  installmentValue: z.number().optional(),
  categoryId: z.string().uuid(),
});

export type CreatedExpenseDto = z.infer<typeof createExpenseSchema>;
