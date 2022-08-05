// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { expensesRouter } from './expenses';
import { categoriesRouter } from './categories';

import { protectedExampleRouter } from './protected-example-router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('example.', exampleRouter)
  .merge('question.', protectedExampleRouter)
  .merge('expense.', expensesRouter)
  .merge('categories.', categoriesRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
