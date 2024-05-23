import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/reducers/authSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="relative w-64">
      <div className=" z-40 w-64 h-full p-4 overflow-y-auto bg-white ">
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2">
            <li>
              <Link
                to={`/dashboard/`}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <Icon
                  icon="majesticons:home-analytics-line"
                  className="h-6 w-6 text-slate-500"
                />

                <span className="ml-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to={`/dashboard/animallist`}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <Icon
                  icon="ph:paw-print-duotone"
                  className="h-6 w-6 text-slate-500"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Animals</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/eventlist`}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <Icon
                  icon="material-symbols:list-alt-add-outline-rounded"
                  className="h-6 w-6 text-slate-500"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Events</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/adoptionlist`}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <Icon
                  icon="ic:sharp-catching-pokemon"
                  className="h-6 w-6 text-slate-500"
                />
                <span className="flex-1 ml-3 whitespace-nowrap">Adoptions</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/dashboard/donationlist`}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <Icon
                  icon="mingcute:hand-heart-line"
                  className="h-6 w-6 text-slate-500"
                />

                <span className="flex-1 ml-3 whitespace-nowrap">Donations</span>
              </Link>
            </li>

            <li>
              <Link
                to={`/dashboard/userlist`}
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 "
              >
                <Icon icon="uil:users-alt" className="h-6 w-6 text-slate-500" />
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </Link>
            </li>

            <li>
              <div
                onClick={() => {
                  dispatch(logout());

                  navigate('/');
                }}
                className="flex w-full items-start justify-start p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 cursor-pointer"
              >
                <Icon
                  icon="majesticons:logout-line"
                  className="h-6 w-6 text-slate-500"
                />

                <span className="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
