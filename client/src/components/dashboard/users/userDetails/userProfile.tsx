import { Icon } from '@iconify/react';

type UserInfoFieldProps = {
  title?: string;
  value?: string;
};

const UserInfoField = ({ title, value }: UserInfoFieldProps) => {
  return (
    <div>
      <span className="font-mono font-normal">{title}</span>
      <p className="text-gray-700  font-semibold">{value}</p>
    </div>
  );
};

const UserProfile = ({ data }) => {
  return (
    <div className="border rounded-lg px-8 py-4">
      <div className="flex items-center justify-between space-y-1.5  py-4 mb-6  border-b border-border">
        <div className="text-xl font-semibold text-slate-900">
          <h3>User Details</h3>
        </div>
      </div>
      <div>
        <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
          <div className="flex xl:flex-col items-center gap-4">
            {data.imageUrl ? (
              <img
                className="h-20 w-20 object-cover rounded-full"
                src={data.imageUrl}
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-300 flex justify-center items-center">
                <Icon icon="bi:person-fill" className="h-6 w-6 text-white" />
              </div>
            )}
            <h4 className="font-bold">{data.name}</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-y-7 gap-x-4 mt-10">
            <UserInfoField title="id" value={data.id} />
            <UserInfoField title="Email" value={data.email} />
            <UserInfoField title="Status" value={data.status} />
            <UserInfoField title="Role" value={data.role} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
