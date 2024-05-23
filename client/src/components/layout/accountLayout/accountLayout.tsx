import AccountNav from './accountNav';
import { Outlet, Navigate } from 'react-router-dom';

const AccountLayout = () => {
  const token = localStorage.getItem('token');

  return (
    <div>
      <div className="max-container">
        <div className="flex w-full ">
          <div className="flex-1 w-full  rounded-lg bg-stone-50">
            <AccountNav />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountLayout;
