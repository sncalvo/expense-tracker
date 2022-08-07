import type { NextPage } from 'next';
import Head from 'next/head';

import { NavMenu } from '@components/layouts/NavMenu';

const Statistics: NextPage = () => {
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
        </main>
      </div>
    </>
  );
};

export default Statistics;
