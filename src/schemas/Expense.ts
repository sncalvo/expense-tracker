import { z } from 'zod';

const Categories = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
  })
);

export const Expense = z.object({
  name: z.string(),
  amount: z.preprocess((amount) => parseInt(amount as string, 10), z.number().positive()),
  description: z.string(),
  categories: Categories,
});
