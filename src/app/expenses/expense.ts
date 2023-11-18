import z from 'zod';
import { categorySchema } from '../categories/category';

export const expenseFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(30, "Name must be shorter than 30 characters"),
  description: z.string().min(1, "Description is required").max(100, "Description must be shorter than 100 characters"),
  categoryId: z.number(),
  amount: z.number(),
  date: z.preprocess((arg) => {
    if (typeof arg === 'string' && !isNaN(Date.parse(arg))) {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
});

export const expenseSchema = expenseFormSchema.extend({
  id: z.number(),
  category: categorySchema,
});

export type Expense = z.infer<typeof expenseSchema>;
export type ExpenseFormSchema = z.infer<typeof expenseFormSchema>;
