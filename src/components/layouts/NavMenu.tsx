import { useState } from 'react';

import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@components/atoms';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { signIn, signOut, useSession } from 'next-auth/react';

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Expenses',
    href: '/expenses',
  },
  {
    name: 'Statistics',
    href: '/statistics',
  },
];

export const NavMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { data } = useSession();

  return (
    <>
      <div className="absolute lg:hidden">
        <Button onClick={() => setOpen(true)}>
          <AiOutlineMenu />
        </Button>
      </div>
      <nav
        className={clsx(
          {
            '-translate-x-full lg:translate-x-0': !open,
          },
          'fixed lg:static flex flex-col justify-start p-3 transition-all bg-gray-700 h-screen shadow'
        )}
      >
        <div className="flex justify-end lg:hidden">
          <Button onClick={() => setOpen(false)} icon size="small" type="button">
            <AiOutlineClose />
          </Button>
        </div>
        <ul className="flex flex-col items-stretch">
          <li>
            {data?.user ? (
              <Button type="button" size="small" onClick={() => signOut()}>
                Log out
              </Button>
            ) : (
              <Button type="button" size="small" onClick={() => signIn()}>
                Log in
              </Button>
            )}
          </li>
          {links.map(({ name, href }) => (
            <li key={name} className="flex">
              <Link href={href}>
                <a
                  className={clsx(
                    'text-white hover:text-gray-800 p-2 hover:bg-gray-200',
                    'text-xl',
                    'w-full transition-all rounded'
                  )}
                >
                  {name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
