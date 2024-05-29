import dayjs from 'dayjs';
import { useGetMyDonationRecord } from '../../hooks/querys/donation';
import Pagination from '../../components/account/shared/pagination';

function MyDonation() {
  const myDonationsQuery = useGetMyDonationRecord();
  const myDonations = myDonationsQuery?.data?.data;
  return (
    <div className="bg-white px-2 py-6 md:px-8 rounded-md w-full">
      <div className=" flex items-center justify-between">
        <div>
          <h2 className="text-gray-600 font-semibold">Donation Records</h2>
          {myDonations && (
            <span className="text-xs">{`${myDonations.length} ${
              myDonations.length > 1 ? 'records' : 'record'
            } found`}</span>
          )}
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Record Id
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {myDonations &&
                  myDonations.map((record, i) => {
                    return (
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {record.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {record.type}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {dayjs(record.createdAt).format('DD-MM-YYYY')}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {record.amount}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className=" inline-block px-3 py-1 bg-green-200 text-xs font-semibold text-green-900 leading-tight rounded-full">
                            <span className="relative">
                              {record.paymentStatus}
                            </span>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/*
            </Pagination>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDonation;
