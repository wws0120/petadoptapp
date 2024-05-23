import * as dayjs from 'dayjs';

function AdoptionHistory({ adoptionRecords }) {
  return (
    <div className="lg:col-span-2 mb-4">
      <div className="border rounded-lg border-slate-200">
        <div className="px-6 py-4">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <h4 className="text-xl font-semibold text-slate-900">
              Adoption Record
            </h4>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="rounded-lg divide-y divide-default-200">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-default-200">
                  <thead className="bg-default-100">
                    <tr className="text-start font-mono">
                      <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                        Apply Date
                      </th>
                      <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                        Record ID
                      </th>
                      <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 min-w">
                        Animal
                      </th>

                      <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 min-w-[10rem]">
                        Status
                      </th>
                    </tr>
                    {/* end table-head-row */}
                  </thead>
                  {/* end t-head */}
                  <tbody className="divide-y divide-default-200">
                    {adoptionRecords &&
                      adoptionRecords.map((record) => {
                        return (
                          <tr key={record.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                              {dayjs(record.createdAt).format('DD/MM/YYYY')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                              {record.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-800">
                              <div className="flex items-center gap-4">
                                <div className="shrink">
                                  <div className="h-11 w-11">
                                    <img
                                      src={record.animal.gallery[0]}
                                      className="max-w-full h-full"
                                    />
                                  </div>
                                </div>
                                <div className="grow">
                                  <p className="text-sm text-default-500 mb-1">
                                    {record.animal.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center gap-1 py-1 px-4 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-500">
                                {record.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdoptionHistory;
