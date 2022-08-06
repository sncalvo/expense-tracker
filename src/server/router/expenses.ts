import { createRouter } from './context';

import { Expense, UpdateCategoriesSchema } from '@schemas/Expense';
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
  })
  .mutation('udpateCategories', {
    input: UpdateCategoriesSchema,
    async resolve({ ctx, input }) {
      const { id, categories } = input;

      return await ctx.prisma.expense.update({
        where: { id },
        data: {
          categories: {
            connectOrCreate: categories.connectOrCreate?.map(({ id, name }) => ({
              where: { id },
              create: { name },
            })),
            disconnect: categories.disconnect,
          },
        },
      });
    },
  });
