import { USERSTATUS } from '../../../configs/constants';

const UserSelectBox = ({ setStatusFilter }) => (
  <div className="w-60">
    <span className="text-sm">Filter Status</span>
    <select
      onChange={(event) => setStatusFilter(event.target.value)}
      name="userStatus"
    >
      <option value="">Select a status</option>
      <option value="">All</option>
      {Object.values(USERSTATUS).map((status) => (
        <option value={status} key={status}>
          {status}
        </option>
      ))}
    </select>
  </div>
);

export default UserSelectBox;
