import { Icon } from '@iconify/react';
import {
  useGetDashboardCounts,
  useGetDonationSummary,
  useGetRecentAnimals,
  useGetActiveAdoptions,
} from '../../hooks/querys/dashboard';
import DonationChart from '../../components/dashboard/dashboard/donationChart';
import { Link } from 'react-router-dom';

function Dashboard() {
  const dashboardCountsQuery = useGetDashboardCounts();
  const donationSummaryQuery = useGetDonationSummary();
  const recentAnimalsQuery = useGetRecentAnimals();
  const activeAdoptionsQuery = useGetActiveAdoptions();

  const dashboardCounts = dashboardCountsQuery?.data?.data;
  const donationSummary = donationSummaryQuery?.data?.data;
  const recentAnimals = recentAnimalsQuery?.data?.data;
  const activeAdoptions = activeAdoptionsQuery?.data?.data;

  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <div className="mr-6">
          <h1 className="text-4xl font-semibold mb-2">Welcome To Dashboard</h1>
          <h2 className="text-gray-600 ml-0.5">
            We Facilitate Endless Bonds: Championing Pet Adoption and Care
          </h2>
        </div>
      </div>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
            <Icon className="w-6 h-6" icon="grommet-icons:group" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {dashboardCounts?.userCount ? dashboardCounts.userCount : 0}
            </span>
            <span className="block text-gray-500">Users</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
            <Icon className="w-6 h-6" icon="lucide:paw-print" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {dashboardCounts?.animalCount ? dashboardCounts.animalCount : 0}
            </span>
            <span className="block text-gray-500">Animals</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
            <Icon className="w-6 h-6" icon="tabler:home-check" />
          </div>
          <div>
            <span className="inline-block text-2xl font-bold">
              {dashboardCounts?.adoptedAnimalCount
                ? dashboardCounts.adoptedAnimalCount
                : 0}
            </span>
            <span className="block text-gray-500">Animals Homed</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
            <Icon className="w-6 h-6" icon="ic:outline-festival" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {' '}
              {dashboardCounts?.eventCount ? dashboardCounts.eventCount : 0}
            </span>
            <span className="block text-gray-500">Event Entries Tally</span>
          </div>
        </div>
      </section>
      <section className="grid md:grid-cols-2 xl:grid-cols-4 grid-rows-3 xl:grid-flow-col gap-6">
        <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            Half-Yearly Donation Overview.
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-center h-full px-4 py-2 text-gray-400 text-3xl font-semibold bg-gray-50  rounded-md">
              {donationSummary?.formattedMonthlyAmount && (
                <DonationChart data={donationSummary?.formattedMonthlyAmount} />
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
            <Icon className="w-6 h-6" icon="mdi:charity-outline" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              $ {donationSummary?.totalDonationsCurrentYear}
            </span>
            <span className="block text-gray-500">Donations (This Year)</span>
          </div>
        </div>
        <div className="flex items-center p-8 bg-white shadow rounded-lg">
          <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
            <Icon className="w-6 h-6" icon="quill:snooze-month" />
          </div>
          <div>
            <span className="block text-2xl font-bold">
              {donationSummary?.subscriptionCount}
            </span>
            <span className="block text-gray-500">
              Current Active Subscriptions
            </span>
          </div>
        </div>
        <div className="row-span-3 bg-white shadow rounded-lg">
          <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
            <span>Recently Added Animals</span>
          </div>
          <div className="overflow-y-auto" style={{ maxHeight: '24rem' }}>
            <ul className="p-6 space-y-6">
              {recentAnimals &&
                recentAnimals?.length > 0 &&
                recentAnimals.map((animal) => {
                  return (
                    <li
                      key={`animal${animal.id}`}
                      className="flex items-center"
                    >
                      <div className="h-6 w-6 mr-3 bg-gray-100 rounded-full overflow-hidden">
                        <img
                          src={animal?.gallery?.[0] ?? ''}
                          alt={animal.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-gray-600">{animal.name}</span>
                      <span className="text-xs ml-auto font-semibold">
                        {animal.status}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">
            In-Progress Adoptions
          </div>
          <div className="p-4 flex-grow">
            {activeAdoptions?.length > 0 ? (
              activeAdoptions.map((record) => {
                return (
                  <Link
                    key={`adoption${record.id}`}
                    to={`/dashboard/adoptiondetail/${record.id}`}
                    className="flex items-center py-1"
                  >
                    <div className="h-6 w-6 mr-3  bg-gray-100 rounded-full overflow-hidden">
                      <img
                        src={record.animal.gallery[0]}
                        alt={record.animal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="ml-auto text-xs font-semibold">
                      {record.status}
                    </span>
                  </Link>
                );
              })
            ) : (
              <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                Empty
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
