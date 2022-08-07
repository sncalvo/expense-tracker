import { useState } from 'react';

import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@components/atoms';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const links = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Expenses',
    href: '/expenses',
  },
];

export const NavMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

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
