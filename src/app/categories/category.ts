import z from 'zod';

export const categoryFormSchema = z.object({
    name: z.string().min(1, "Name is required").max(30, "Name must be shorter than 30 characters"),
    description: z.string().min(1, "Description is required").max(100, "Description must be shorter than 100 characters"),
});

export const categorySchema = categoryFormSchema.extend({
  id: z.number(),
});


export const serverCategorySchema = categorySchema.extend({
  userId: z.string(),
});

export type ServerCategory = z.infer<typeof serverCategorySchema>;
export type Category = z.infer<typeof categorySchema>;
export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
