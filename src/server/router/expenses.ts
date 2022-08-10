import { createProtectedRouter } from './protected-router';

import { Expense, UpdateCategoriesSchema } from '@schemas/Expense';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const expensesRouter = createProtectedRouter()
  .query('allExpenses', {
    async resolve({ ctx }) {
      return await ctx.prisma.expense.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          categories: true,
        },
      });
    },
  })
  .mutation('createExpense', {
    input: Expense,
    async resolve({ ctx, input }) {
      if (!ctx.session.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const { name, amount, description, categories } = input;

      return await ctx.prisma.expense.create({
        data: {
          userId: ctx.session.user.id,
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
      if (!ctx.session.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const expense = await ctx.prisma.expense.findFirst({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
      });

      if (!expense) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

      return await ctx.prisma.expense.delete({
        where: { id: input.id },
      });
    },
  })
  .mutation('udpateCategories', {
    input: UpdateCategoriesSchema,
    async resolve({ ctx, input }) {
      if (!ctx.session.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const { id, categories } = input;

      const expense = await ctx.prisma.expense.findFirst({
        where: {
          id,
          userId: ctx.session.user.id,
        },
      });

      if (!expense) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }

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
