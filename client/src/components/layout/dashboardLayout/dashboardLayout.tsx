import Sidebar from '../sidebar/sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="flex w-screen max-w-full">
      <Sidebar />
      <div className="flex-1 w-full rounded-lg bg-slate-50">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
