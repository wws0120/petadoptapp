import { useState } from 'react';
import Pagination from '../../components/shared/pagination';
import AdoptionItem from '../../components/dashboard/adoptions/adoptionItem';
import AdoptionListToolbar from '../../components/dashboard/adoptions/adoptionListToolbar';
import {
  useGetAllAdoptions,
  useUpdateAdoptionStatusMutation,
} from '../../hooks/querys/adoption';

function AdoptionList() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useGetAllAdoptions(page, statusFilter);
  const adoptionData = data?.data?.records;
  const { mutateAsync: updateAdoptionStatusMutation } =
    useUpdateAdoptionStatusMutation();

  function handleUpdateStatus(id, status) {
    updateAdoptionStatusMutation({ id, status });
  }

  return (
    <div className="container mx-auto p-6 sm:p-10 space-y-6 min-h-[calc(100vh-138px)]  relative pb-14 ">
      <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
        <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
          <div className="h-full">
            <div>
              <h4 className="font-bold text-2xl">Adoption List</h4>
              <AdoptionListToolbar setStatusFilter={setStatusFilter} />
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
                        Record
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Adopter
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Animal
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Update Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                      <th scope="col" className="sr-only">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {adoptionData &&
                      adoptionData.map((data, index) => {
                        return (
                          <AdoptionItem
                            key={index}
                            item={data}
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
      <Pagination
        isPreviousData={isPreviousData}
        totalPages={data ? data?.data?.totalPages : 0}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

export default AdoptionList;
