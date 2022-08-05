import { z } from 'zod';
import { createRouter } from './context';

export const categoriesRouter = createRouter()
  .query('allCategories', {
    input: z.string().optional(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.category.findMany({
        where: {
          name: {
            contains: input,
          },
        },
      });
    },
  })
  .mutation('createCategory', {
    input: z.object({
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      const otherCategroy = await ctx.prisma.category.findFirst({
        where: {
          name: input.name,
        },
      });

      if (otherCategroy !== null) {
        return otherCategroy;
      }

      return await ctx.prisma.category.create({
        data: input,
      });
    },
  });
