import React from 'react';
import { Icon } from '@iconify/react';

function EditMenuItem({ title, icon, action }) {
  return (
    <div className="flex items-center justify-between p-2 hover:text-gray-400 hover:bg-gray-50">
      <div onClick={action} className="flex items-center ">
        <p className="text-sm leading-normal ml-2 uppercase text-gray-800">
          {title}
        </p>
      </div>
      <Icon className="h-5 w-5" icon={icon} />
    </div>
  );
}

export default EditMenuItem;
