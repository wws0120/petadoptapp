import React from 'react';
import { Icon } from '@iconify/react';
import { ROLES } from '../../../configs/constants';

function EditMenuItem({
  title,
  icon,
  action,
  user,
  rolesMenuShow,
  editUserRole,
}) {
  const rolesArray = Object.values(ROLES);

  return (
    <>
      <div className="relative flex items-center justify-between p-2 ">
        <div
          onClick={action}
          className="flex items-center hover:text-gray-400 hover:bg-gray-50"
        >
          <p className="text-sm leading-normal ml-2 uppercase text-gray-800">
            {title}
          </p>
        </div>
        <Icon className="h-5 w-5" icon={icon} />
        {rolesMenuShow && title === 'Update Role' && (
          <div className="absolute left-0 z-20  top-0 bg-white border border-inherit rounded-md shadow-xl w-40 transform translate-x-[-10rem]">
            {rolesArray.map((role, i) => {
              return (
                <li
                  onClick={() => {
                    editUserRole({ id: user.id, role: role });
                  }}
                  key={i}
                  className="flex items-end p-2 hover:text-gray-400 hover:bg-gray-50 text-sm text-end  leading-normal ml-2 uppercase text-gray-800"
                >
                  {role}
                </li>
              );
            })}
          </div>
        )}
      </div>{' '}
    </>
  );
}

export default EditMenuItem;
