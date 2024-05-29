import dayjs from 'dayjs';
import { useGetMyAdoptionRecord } from '../../hooks/querys/adoption';
import Pagination from '../../components/account/shared/pagination';

function MyAdoption() {
  const myAdoptionsQuery = useGetMyAdoptionRecord();
  const myAdoptions = myAdoptionsQuery?.data?.data;
  return (
    <div className="bg-white px-2 py-6 md:px-8  rounded-md w-full">
      <div className=" flex items-center justify-between">
        <div>
          <h2 className="text-gray-600 font-semibold">Adoption Records</h2>
          {myAdoptions && (
            <span className="text-xs">{`${myAdoptions.length} ${
              myAdoptions.length > 1 ? 'records' : 'record'
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
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Pet Name
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Applied On
                  </th>

                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {myAdoptions &&
                  myAdoptions.map((record, i) => {
                    return (
                      <tr key={i}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src={record.animal.gallery[0]}
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="cursor-pointer select-none font-semibold hover:text-indigo-600 whitespace-no-wrap">
                                {record.animal.name}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {dayjs(record.createdAt).format('DD-MM-YYYY')}
                          </p>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className=" inline-block px-3 py-1 bg-green-200 text-xs font-semibold text-green-900 leading-tight rounded-full">
                            <span className="relative">{record.status}</span>
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

export default MyAdoption;
