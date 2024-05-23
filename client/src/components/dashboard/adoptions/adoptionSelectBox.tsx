import React from 'react';
import { ADOPTIONRECORDSTATUS } from '../../../configs/constants';

const AdoptionSelectBox = ({ setStatusFilter }) => (
  <div className="w-60">
    <span className="text-sm">Filter Status</span>
    <select
      onChange={(event) => setStatusFilter(event.target.value)}
      name="adoptionStatus"
    >
      <option value="">Select a status</option>
      <option value="">All</option>
      {Object.values(ADOPTIONRECORDSTATUS).map((status) => (
        <option value={status} key={status}>
          {status}
        </option>
      ))}
    </select>
  </div>
);

export default AdoptionSelectBox;
