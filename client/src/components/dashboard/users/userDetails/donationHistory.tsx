import React from 'react';

function AdoptionHistory({ donationRecords }) {
  return (
    <div className="lg:col-span-2">
      <div className="border rounded-lg border-default-200">
        <div className="px-6 py-4">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <h4 className="text-xl font-semibold text-slate-900">
              Donation Record
            </h4>
            <div className="flex items-center">
              <span className="text-base text-default-950 me-3">Sort By :</span>
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  type="button"
                  className="hs-dropdown-toggle flex items-center gap-2 font-medium text-default-950 text-sm py-2.5 px-4 xl:px-5 rounded-lg border border-default-200 transition-all"
                >
                  All <i data-lucide="chevron-down" className="h-4 w-4" />
                </button>
                {/* end dropdown button */}
                <div className="hs-dropdown-menu hs-dropdown-open:opacity-100 min-w-[200px] transition-[opacity,margin] mt-4 opacity-0 hidden z-20 bg-white dark:bg-default-50 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg border border-default-100 p-1.5">
                  <ul className="flex flex-col gap-1">
                    <li>
                      <a
                        className="flex items-center gap-3 font-normal py-2 px-3 transition-all text-default-700 bg-default-400/20 rounded"
                        href="javascript:void(0)"
                      >
                        All
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex items-center gap-3 font-normal text-default-600 py-2 px-3 transition-all hover:text-default-700 hover:bg-default-400/20 rounded"
                        href="javascript:void(0)"
                      >
                        Refund
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex items-center gap-3 font-normal text-default-600 py-2 px-3 transition-all hover:text-default-700 hover:bg-default-400/20 rounded"
                        href="javascript:void(0)"
                      >
                        Paid
                      </a>
                    </li>
                    <li>
                      <a
                        className="flex items-center gap-3 font-normal text-default-600 py-2 px-3 transition-all hover:text-default-700 hover:bg-default-400/20 rounded"
                        href="javascript:void(0)"
                      >
                        Cancel
                      </a>
                    </li>
                  </ul>
                  {/* end dropdown items */}
                </div>
                {/* end dropdown menu */}
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="rounded-lg divide-y divide-default-200">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-default-200">
                  <thead className="bg-default-100">
                    <tr className="text-start">
                      <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                        Date
                      </th>
                      <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                        Record ID
                      </th>
                      <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 min-w">
                        Type
                      </th>
                      <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-start text-sm whitespace-nowrap font-medium text-default-800 min-w-[10rem]">
                        Status
                      </th>
                    </tr>
                    {/* end table-head-row */}
                  </thead>
                  {/* end t-head */}
                  <tbody className="divide-y divide-default-200">
                    {donationRecords &&
                      donationRecords.map((record, i) => {
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                            01/Sep/22
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                            #4357
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-800">
                            <div className="flex items-center gap-4">
                              <div className="shrink">
                                <div className="h-11 w-11">
                                  <img
                                    src="/yum/assets/pizza-6722ca13.png"
                                    className="max-w-full h-full"
                                  />
                                </div>
                              </div>
                              <div className="grow">
                                <p className="text-sm text-default-500 mb-1">
                                  Veg Pizza
                                </p>
                                <div className="flex items-center gap-2">
                                  <div className="flex gap-1.5">
                                    <button>
                                      <i
                                        data-lucide="star"
                                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                                      />
                                    </button>
                                    <button>
                                      <i
                                        data-lucide="star"
                                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                                      />
                                    </button>
                                    <button>
                                      <i
                                        data-lucide="star"
                                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                                      />
                                    </button>
                                    <button>
                                      <i
                                        data-lucide="star"
                                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                                      />
                                    </button>
                                    <button>
                                      <i
                                        data-lucide="star"
                                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                                      />
                                    </button>
                                  </div>
                                  <h6 className="text-xs text-default-500 mt-1">
                                    (54)
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-default-500">
                            $45.24
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 py-1 px-4 rounded-full text-sm font-medium bg-yellow-500/20 text-yellow-500">
                              Refund
                            </span>
                          </td>
                        </tr>;
                      })}
                  </tbody>
                  {/* end t-body */}
                </table>
                {/* end table */}
              </div>
              {/* end overflo-hidden */}
            </div>
            {/* end table-responsive */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdoptionHistory;
