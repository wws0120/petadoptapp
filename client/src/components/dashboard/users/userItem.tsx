import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../../hooks/utils/useOnClickOutside';
import { useEditUserRoleMutation } from '../../../hooks/querys/users';
import UserStatus from './userStatus';
import EditMenuItem from './editMenuItem';

function UserItem({ user, handleUpdateStatus }) {
  const [editMenuShow, setEditMenuShow] = useState(false);
  const [rolesMenuShow, setRolesMenuShow] = useState(false);
  const navigate = useNavigate();

  const { mutateAsync: editUserRole } = useEditUserRoleMutation();
  const menuRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(menuRef, () => {
    setEditMenuShow(false);
    setRolesMenuShow(false);
  });

  const menuItems = [
    {
      title: 'User Details',
      icon: 'heroicons:document-magnifying-glass',
      action: () => {
        navigate(`/dashboard/userdetail/${user.id}`);
      },
    },
    {
      title: 'Update Role',
      icon: 'oui:app-users-roles',
      action: () => {
        setRolesMenuShow(true);
      },
    },
  ];

  return (
    <tr className="bg-white border-b   hover:bg-gray-100  ">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900   whitespace-nowrap"
      >
        <Link
          to={`/dashboard/userdetail/${user.id}`}
          className="flex items-center"
        >
          {user.imageUrl ? (
            <img src={user.imageUrl} className="h-10 w-10 rounded-full" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex justify-center items-center">
              <Icon icon="bi:person-fill" className="h-6 w-6 text-white" />
            </div>
          )}
          <div className="ml-4">
            <span className="capitalize block text-gray-800 font-semibold">
              {user.name}
            </span>
            <span className="text-sm block text-gray-600">{user.email}</span>
          </div>
        </Link>
      </th>
      <td className="px-6 py-4">{user.name}</td>
      <td className="px-6 py-4">{user.role}</td>
      <td className="px-6 py-4">
        <UserStatus status={user.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          <select
            onChange={(e) => {
              handleUpdateStatus(user.id, e.target.value);
            }}
            value={user.status}
            className="block w-full  border bg-gray-100 px-2 py-1 text-sm  focus:outline-none rounded-md form-select focus:bg-white  focus:border-gray-200 border-gray-200  focus:shadow-none  leading-5 h-8"
          >
            <option value="PENDING">Pending</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="BANNED">Banned</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="DELETED">Deleted</option>
          </select>
        </a>
      </td>
      <td className="flex px-6 py-4">
        <div className="relative text-2xl font-extrabold text-slate-500 cursor-pointer ">
          <Icon
            className="hover:text-gray-400"
            icon="iconamoon:menu-kebab-vertical-circle-light"
            onClick={() => setEditMenuShow(true)}
          />
          {editMenuShow && (
            <div
              ref={menuRef}
              className="absolute left-[-10rem] z-20 w-48 mt-2  origin-top-right bg-white border border-inherit rounded-md shadow-xl "
            >
              {menuItems.map((item) => (
                <EditMenuItem
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  action={item.action}
                  user={user}
                  rolesMenuShow={rolesMenuShow}
                  editUserRole={editUserRole}
                />
              ))}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default UserItem;
