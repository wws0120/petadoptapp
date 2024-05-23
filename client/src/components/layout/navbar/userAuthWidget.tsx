import { useState, useEffect } from 'react';
import { loginChecker } from '../../../utils/authUtils';
import NavUserInfo from './navUserInfo';
import { Link } from 'react-router-dom';

function UserAuthWidget() {
  const isLogin = loginChecker();

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <div className="relative ml-3 flex gap-4 items-center">
        {isLogin ? (
          <NavUserInfo />
        ) : (
          <>
            <div>
              <Link
                className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
                to="/login"
              >
                Sign In
              </Link>
              <Link
                className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                to="/signup"
              >
                Sign up
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default UserAuthWidget;
