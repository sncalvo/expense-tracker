import { z } from 'zod';

export const Categories = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const Expense = z.object({
  name: z.string(),
  amount: z.preprocess((amount) => parseInt(amount as string, 10), z.number().positive()),
  description: z.string(),
  createdAt: z.string().optional(),
  categories: Categories,
});

export const UpdateCategoriesSchema = z.object({
  id: z.string(),
  categories: z.object({
    connectOrCreate: z
      .array(
        z.object({
          id: z.string().optional(),
          name: z.string(),
        })
      )
      .optional(),
    disconnect: z.array(z.object({ id: z.string() })).optional(),
  }),
});
