import UserProfile from '../../components/dashboard/users/userDetails/userProfile';
import UserSubscription from '../../components/dashboard/users/userDetails/userSubscription';
import AdoptionHistory from '../../components/dashboard/users/userDetails/adoptionHistory';
import DonationHistory from '../../components/dashboard/users/userDetails/donationHistory';

import { useGetUserDetail } from '../../hooks/querys/users';
import isEmpty from 'lodash/isEmpty';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const userDetailsQuery = useGetUserDetail(id);
  const userDetails = userDetailsQuery?.data?.data;
  const subsrciption = userDetails?.donations.filter((record) => {
    return record.type === 'subscription';
  })[0];

  return (
    <div className="h-full container mx-auto page-container relative md:border-gray-200 flex flex-auto flex-col p-6 sm:p-10 space-y-6">
      {!isEmpty(userDetails) && (
        <div className="flex flex-col w-full gap-4">
          <div className="py-4 md:border-gray-200  rounded-br-none rounded-bl-none">
            {userDetails && <UserProfile data={userDetails} />}
          </div>
          <div className="w-full">
            <div className=" md:border-gray-200  rounded-br-none rounded-bl-none">
              {userDetails && userDetails.adoptions.length > 0 && (
                <UserSubscription subscriptionRecords={subsrciption} />
              )}
              {userDetails && userDetails.adoptions.length > 0 && (
                <AdoptionHistory adoptionRecords={userDetails.adoptions} />
              )}
              {userDetails && userDetails.donations.length > 0 && (
                <DonationHistory donationRecords={userDetails.donations} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
