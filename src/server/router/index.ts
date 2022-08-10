// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { expensesRouter } from './expenses';
import { categoriesRouter } from './categories';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('expense.', expensesRouter)
  .merge('categories.', categoriesRouter);

export type AppRouter = typeof appRouter;
