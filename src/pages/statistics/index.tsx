import type { NextPage } from 'next';
import Head from 'next/head';

import { NavMenu } from '@components/layouts/NavMenu';
import { DoughnutChart } from '@components/molecules';
import { trpc } from '@utils/trpc';
import { Expense } from '@prisma/client';
import { useMemo } from 'react';

import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

type ExpensesByDate = { [key: number]: Expense[] };

const groupByDate = (expenses: Expense[]): ExpensesByDate =>
  expenses.reduce((acc, expense) => {
    const date = expense.createdAt.getMonth();

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date]!.push(expense);

    return acc;
  }, {} as ExpensesByDate);

const Statistics: NextPage = () => {
  const expenses = trpc.useQuery(['expense.allExpenses']);

  const expenseByDate = useMemo(() => groupByDate(expenses.data || []), [expenses.data]);

  const data = useMemo(
    () => ({
      labels: Object.keys(expenseByDate),
      datasets: [
        {
          label: 'Expenses',
          data: Object.keys(expenseByDate).map(
            (date) =>
              expenseByDate[date as unknown as keyof ExpensesByDate]?.reduce(
                (acc, expense) => acc + expense.amount,
                0
              ) ?? 0
          ),
        },
      ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
    }),
    [expenseByDate]
  );

  return (
    <>
      <Head>
        <title>Expense statistics</title>
        <meta name="description" content="Your expenses statistics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        <NavMenu />

        <main className="p-8">
          <h1 className="text-2xl leading-normal font-extrabold">Expense statistics</h1>

          <div className="p-3">
            {expenses.data ? <DoughnutChart data={data} /> : <div>Loading...</div>}
          </div>
        </main>
      </div>
    </>
  );
};

export default Statistics;
