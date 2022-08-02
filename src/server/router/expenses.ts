import { createRouter } from './context';
import { z } from 'zod';

export const expensesRouter = createRouter()
  .query('allExpenses', {
    async resolve({ ctx }) {
      return await ctx.prisma.expense.findMany();
    },
  })
  .mutation('createExpense', {
    input: z.object({
      name: z.string(),
      description: z.string(),
      amount: z.number(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.expense.create({
        data: input,
      });
    },
  });
