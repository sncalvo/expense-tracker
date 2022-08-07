import type { NextPage } from 'next';
import Head from 'next/head';

import { ExpenseCard } from '@components/molecules';
import { NewExpenseForm } from '@components/organisms';
import { NavMenu } from '@components/layouts/NavMenu';

import { trpc } from '@utils/trpc';

const Expenses: NextPage = () => {
  const expenses = trpc.useQuery(['expense.allExpenses']);

  return (
    <>
      <Head>
        <title>Expense tracker</title>
        <meta name="description" content="Your expenses tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        <NavMenu />

        <main className="p-8">
          <h1 className="text-2xl leading-normal font-extrabold text-gray-700">Expense tracker</h1>

          <NewExpenseForm />

          <div className="md:w-1/2 my-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl leading-normal font-extrabold text-gray-700">Expenses</h2>
              <h3>Total: {expenses.data?.length ?? 'loading...'}</h3>
            </div>
            <ul className="h-96 list-none overflow-auto flex flex-col gap-2">
              {expenses.data?.map((expense) => (
                <ExpenseCard expense={expense} key={expense.id} />
              ))}
              {expenses.isLoading && <li>Loading...</li>}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
};

export default Expenses;
