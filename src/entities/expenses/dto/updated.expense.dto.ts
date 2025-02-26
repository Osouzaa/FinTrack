import { z } from "zod";

export const updatedExpenseSchema = z.object({
  amount:  z.number().optional(), 
  date: z.string().optional(),
  isInstallment: z.boolean().optional(),
  installmentCount: z.number().optional(),
  installmentValue: z.number().optional(),
  categoryId: z.string().uuid().optional(),
});

export type UpdatedExpenseDto = z.infer<typeof updatedExpenseSchema>;
