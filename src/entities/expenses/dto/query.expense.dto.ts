import { z } from 'zod';

export const queryExpenseSchema = z.object({
  page: z
    .string()
    .default('1'),
  limit: z
    .string()
    .default('10'),
  amount: z
    .number()
    .optional(),
  date: z.string().optional(),
  isInstallment: z.boolean().optional(),
  installmentCount: z.number().optional(),
  installmentValue: z.number().optional(),
  categoryId: z.string().uuid().optional(),
});

export type QueryExpenseDto = z.infer<typeof queryExpenseSchema>;