import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

function AccountTabs() {
  const tabs = [
    { text: 'Profile', path: '/account/myprofile', slug: 'myprofile' },
    { text: 'Saved Pets', path: '/account/favorite', slug: 'favorite' },
    { text: 'Adopted Pets', path: '/account/myadoption', slug: 'myadoption' },
    { text: 'Donations', path: '/account/mydonation', slug: 'mydonation' },
    { text: 'Setting', path: '/account/mysetting', slug: 'mysetting' },
  ];

  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];

  function linkClasses(type = null) {
    let classes = '';
    if (type === subpage) {
      classes = 'text-indigo-600 bg-indigo-100';
    } else {
      classes = 'hover:text-gray-900 hover:bg-gray-100';
    }
    return classes;
  }

  return (
    <ul className="flex flex-wrap text-sm font-semibold text-center p-4 gap-3 text-gray-500 ">
      {tabs.map((tab, i) => {
        return (
          <li>
            <Link
              to={tab.path}
              className={clsx(
                'inline-block px-4 py-2  rounded-lg',
                linkClasses(tab.slug)
              )}
            >
              {tab.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default AccountTabs;
