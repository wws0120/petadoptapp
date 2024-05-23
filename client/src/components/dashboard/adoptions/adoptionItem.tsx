import React from 'react';
import AdoptionStatus from './adoptionStatus';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

function AdoptionItem({ item, handleUpdateStatus }) {
  return (
    <tr className="bg-white border-b   hover:bg-gray-100  ">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900   whitespace-nowrap"
      >
        <div className="flex items-center">
          <div className="">
            <span className="capitalize block text-gray-800 font-semibold">
              {item.id}
            </span>
            <span className="text-sm block text-gray-600">
              {item.create_at}TEST
            </span>
          </div>
        </div>
      </th>
      <td className="px-6 py-4">
        <span className="text-sm block text-gray-600">
          {item.adopter.email}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm block text-gray-600">{item.animal.name}</span>
      </td>
      <td className="px-6 py-4 text-xs">
        <AdoptionStatus status={item.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <a
          href="#"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          <select
            onChange={(e) => {
              handleUpdateStatus(item.id, e.target.value);
            }}
            value={item.status}
            className="block w-full  border bg-gray-100 px-2 py-1 text-sm  focus:outline-none rounded-md form-select focus:bg-white  focus:border-gray-200 border-gray-200  focus:shadow-none  leading-5 h-8"
          >
            <option value="PENDING_APPROVAL">Pending approval</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </a>
      </td>
      <td className="flex px-6 py-4">
        <Link
          to={`/dashboard/adoptiondetail/${item.id}`}
          className="inline-block border p-1 m-1 rounded-md  font-extrabold text-slate-500 cursor-pointer hover:text-gray-400"
        >
          <Icon
            className="w-6 h-6"
            icon="heroicons:document-magnifying-glass"
          />
        </Link>
        <button className="inline-block border p-1 m-1 rounded-md  font-extrabold text-slate-500 cursor-pointer hover:text-gray-400">
          <Icon className="w-6 h-6" icon="iconamoon:trash" />
        </button>
      </td>
    </tr>
  );
}

export default AdoptionItem;
