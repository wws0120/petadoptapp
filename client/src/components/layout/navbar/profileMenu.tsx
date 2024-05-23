import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/authSlice';
import { useNavigate, Link } from 'react-router-dom';

import useOnClickOutside from '../../../hooks/utils/useOnClickOutside';

function ProfileMenu({ setShowMenu, currentUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(menuRef, () => setShowMenu(false));

  return (
    <>
      {currentUser && (
        <div
          ref={menuRef}
          className="absolute top-8 right-0 md:left-0 z-50 mt-2 w-48 font-semibold rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <button
            onClick={() => {
              navigate('/account/myprofile');
              setShowMenu(false);
            }}
            className="block w-full px-4 py-3 text-sm text-start text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100"
          >
            Your Profile
          </button>
          <button
            onClick={() => {
              navigate('/account/favorite');
              setShowMenu(false);
            }}
            className="block w-full px-4 py-3 text-sm text-start text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100"
          >
            Saved Pets
          </button>
          <button
            onClick={() => {
              navigate('/account/myadoption');
              setShowMenu(false);
            }}
            className="block w-full px-4 py-3 text-sm text-start text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100"
          >
            My Adoptions
          </button>
          <button
            onClick={() => {
              navigate('/account/mydonation');
              setShowMenu(false);
            }}
            className="block w-full px-4 py-3 text-sm text-start text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100"
          >
            My Donations
          </button>
          <button
            onClick={() => {
              navigate('/account/mysetting');
              setShowMenu(false);
            }}
            className="block w-full px-4 py-3 text-sm text-start text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100"
          >
            Settings
          </button>
          <hr className="border-gray-200" />
          {(currentUser.role === 'ADMIN' ||
            currentUser.role === 'MANAGEMENT') && (
            <>
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setShowMenu(false);
                }}
                className="block w-full px-4 py-3 text-sm text-start text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100"
              >
                Dashboard
              </button>
            </>
          )}
          <hr className="border-gray-200" />
          <button
            onClick={() => {
              dispatch(logout());
              setShowMenu(false);
              navigate('/');
            }}
            className="block w-full px-4 py-3 text-sm text-start text-gray-600 capitalize transition-colors duration-300 transform  hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </>
  );
}

export default ProfileMenu;
