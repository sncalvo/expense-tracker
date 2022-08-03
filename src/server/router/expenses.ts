import { createRouter } from './context';

import { Expense } from '@schemas/Expense';
import { z } from 'zod';

export const expensesRouter = createRouter()
  .query('allExpenses', {
    async resolve({ ctx }) {
      return await ctx.prisma.expense.findMany();
    },
  })
  .mutation('createExpense', {
    input: Expense,
    async resolve({ ctx, input }) {
      return await ctx.prisma.expense.create({
        data: input,
      });
    },
  })
  .mutation('deleteExpense', {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.expense.delete({
        where: { id: input.id },
      });
    },
  });
