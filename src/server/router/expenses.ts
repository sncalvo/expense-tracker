import { createRouter } from './context';

import { Expense } from '@schemas/Expense';
import { z } from 'zod';

export const expensesRouter = createRouter()
  .query('allExpenses', {
    async resolve({ ctx }) {
      return await ctx.prisma.expense.findMany({
        include: {
          categories: true,
        },
      });
    },
  })
  .mutation('createExpense', {
    input: Expense,
    async resolve({ ctx, input }) {
      const { name, amount, description, categories } = input;

      return await ctx.prisma.expense.create({
        data: {
          name,
          amount,
          description,
          categories: {
            connectOrCreate: categories.map(({ id, name }) => ({
              where: { id },
              create: { name },
            })),
          },
        },
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
