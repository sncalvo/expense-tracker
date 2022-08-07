import type { NextPage } from 'next';
import Head from 'next/head';

import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Expense tracker</title>
        <meta name="description" content="Your expenses tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-8">
        <Link href={'/expenses'}>
          <a className="text-gray-600 hover:text-gray-800" href="/expenses">
            Expenses
          </a>
        </Link>
      </main>
    </>
  );
};

export default Home;
