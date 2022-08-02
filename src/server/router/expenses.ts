import { createRouter } from './context';

import { Expense } from '@schemas/Expense';

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
  });
