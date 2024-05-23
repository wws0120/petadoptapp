import { useState } from 'react';
import UserItem from '../../components/dashboard/users/userItem';
import Pagination from '../../components/shared/pagination';
import UserListToolbar from '../../components/dashboard/users/userListToolbar';
import {
  useGetUserList,
  useEditUserStatusMutation,
} from '../../hooks/querys/users';

function Users() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useGetUserList(page, statusFilter);
  const UsersData = data?.data?.users;
  const { mutateAsync: editUserStatusMutation } = useEditUserStatusMutation();

  function handleUpdateStatus(id, status) {
    editUserStatusMutation({ id, status });
  }

  return (
    <div className="container mx-auto p-6 sm:p-10 space-y-6 min-h-[calc(100vh-138px)]  relative pb-14 ">
      <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
        <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
          <div className="h-full">
            <div>
              <h4 className="font-bold text-2xl">User List</h4>
              <UserListToolbar setStatusFilter={setStatusFilter} />
            </div>

            <div className="">
              <div className="relative overflow-x-auto  sm:rounded">
                <table
                  className="w-full text-sm text-left text-gray-500 "
                  id="datatable_1"
                >
                  <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Display Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Edit Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {UsersData &&
                      UsersData.map((data, index) => {
                        return (
                          <UserItem
                            key={index}
                            user={data}
                            handleUpdateStatus={handleUpdateStatus}
                          />
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </div>
  );
}

export default Users;
