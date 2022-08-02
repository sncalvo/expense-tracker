import zod from 'zod';

export const Expense = zod.object({
  name: zod.string(),
  amount: zod.preprocess((amount) => parseInt(amount as string, 10), zod.number().positive()),
  description: zod.string(),
});
