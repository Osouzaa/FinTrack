import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z.preprocess((val) => Number(val), z.number()),  // Assegura que 'amount' será convertido para número
  date: z.string(),
  isInstallment: z.boolean(),
  installmentCount: z.number().optional(),
  installmentValue: z.number().optional(),
  categoryId: z.string().uuid(),
});

export type CreatedExpenseDto = z.infer<typeof createExpenseSchema>;
