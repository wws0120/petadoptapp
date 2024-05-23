import { useState, useEffect } from 'react';
import { useGetCurrentUser } from '../../../hooks/querys/member';
import { loginChecker } from '../../../utils/authUtils';
import ProfileMenu from './profileMenu';
import Avatar from './avatar';
import { Link } from 'react-router-dom';

function UserAuthWidget() {
  const [showMenu, setShowMenu] = useState(false);

  const isLogin = loginChecker();
  const handleProfileClicked = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <div className="relative ml-3 flex gap-4 items-center">
        {isLogin ? (
          <>
            {' '}
            <Avatar handleProfileClicked={handleProfileClicked} />
            <span className="hidden md:block font-semibold">
              email@test.com
            </span>
            {showMenu && <ProfileMenu setShowMenu={setShowMenu} />}
          </>
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

export default UserNav;
