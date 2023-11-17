import z from 'zod';
import { categorySchema } from '../categories/category';

export const expenseFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.number(),
  amount: z.number(),
});

export const expenseSchema = expenseFormSchema.extend({
  id: z.number(),
  category: categorySchema,
});

export type Expense = z.infer<typeof expenseSchema>;
export type ExpenseFormSchema = z.infer<typeof expenseFormSchema>;
