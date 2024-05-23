import React from 'react';
import UserSelectBox from './userSelectBox';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

function UserListToolbar({ setStatusFilter }) {
  return (
    <div className="py-4">
      <UserSelectBox setStatusFilter={setStatusFilter} />
    </div>
  );
}

export default UserListToolbar;
