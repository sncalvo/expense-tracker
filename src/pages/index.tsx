import { NewExpenseForm } from '@components/organisms';
import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const expenses = trpc.useQuery(['expense.allExpenses']);

  return (
    <>
      <Head>
        <title>Expense tracker</title>
        <meta name="description" content="Your expenses tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-2xl leading-normal font-extrabold text-gray-700">Expense tracker</h1>

        <NewExpenseForm />

        <ul className="list-disc list-inside">
          {expenses.data?.map((expense) => (
            <li key={expense.id}>
              {expense.name} - {expense.amount}
            </li>
          ))}
          {expenses.isLoading && <li>Loading...</li>}
        </ul>
      </main>
    </>
  );
};

export default Home;
