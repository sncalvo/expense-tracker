import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createProtectedRouter } from './protected-router';

export const categoriesRouter = createProtectedRouter()
  .query('allCategories', {
    input: z.string().optional(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.category.findMany({
        where: {
          name: {
            contains: input,
          },
          OR: [{ userId: ctx.session.user.id }, { userId: null }],
        },
      });
    },
  })
  .mutation('createCategory', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN' });
      }

      const otherCategroy = await ctx.prisma.category.findFirst({
        where: {
          name: input.name,
          OR: [{ userId: ctx.session.user.id }, { userId: null }],
        },
      });

      if (otherCategroy !== null) {
        return otherCategroy;
      }

      return await ctx.prisma.category.create({
        data: { ...input, userId: ctx.session.user.id },
      });
    },
  });
