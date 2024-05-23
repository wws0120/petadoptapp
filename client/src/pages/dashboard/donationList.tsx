import { useState } from 'react';
import Pagination from '../../components/shared/pagination';
import DonationItem from '../../components/dashboard/donations/donationItem';
import { useGetDonationList } from '../../hooks/querys/donation';

function DonationList() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useGetDonationList(page);
  const donations = data?.data?.donations;

  return (
    <div className="container mx-auto p-6 sm:p-10 space-y-6 min-h-[calc(100vh-138px)]  relative pb-14 ">
      <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
        <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
          <div className="h-full">
            <div className="pb-4">
              <h4 className="font-bold text-2xl">Donation List</h4>
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
                        User Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Donation Type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations &&
                      donations.map((data, index) => {
                        return <DonationItem key={index} item={data} />;
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

export default DonationList;
