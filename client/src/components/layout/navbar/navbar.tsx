import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import logo from '../../../assets/logo.svg';
import { NAVLINKS } from '../../../configs/constants';
import { Icon } from '@iconify/react';
import UserAuthWidget from './userAuthWidget';
import MobileNav from './mobileNav';

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  const { pathname } = useLocation();

  function linkClasses(currentPath = null) {
    if (currentPath === pathname) {
      return 'bg-gray-900 text-white';
    } else {
      return 'text-gray-800 hover:bg-gray-200 hover:text-gray-500';
    }
  }

  return (
    <>
      <nav className="relative w-full">
        <div className=" w-full py-5 px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={() => {
                  setNavOpen(!navOpen);
                }}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <Icon className="block h-6 w-6" icon="ic:baseline-menu" />
                <Icon className="hidden h-6 w-6" icon="ic:baseline-menu" />
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link to={'/'} className="flex flex-shrink-0 items-center">
                <img
                  className="block h-8 w-auto lg:hidden"
                  src={logo}
                  alt="LOGO"
                />
                <img
                  className="hidden h-9 w-auto lg:block"
                  src={logo}
                  alt="LOGO"
                />
              </Link>
              <div className="hidden  items-center sm:ml-6 sm:flex">
                <div className="flex  space-x-4">
                  {NAVLINKS.map((item, index) => {
                    return (
                      <Link
                        to={item.path}
                        className={clsx(
                          'text-sm  uppercase font-semibold rounded-md px-3 py-2',
                          linkClasses(item.path)
                        )}
                        key={index}
                      >
                        {item.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <UserAuthWidget />
          </div>
        </div>
        {navOpen && <MobileNav />}
      </nav>
    </>
  );
}
