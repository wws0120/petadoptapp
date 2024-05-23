import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import * as dayjs from 'dayjs';
import AnimalStatus from './animalStatus';

function AnimalItem({
  item,
  setSelectedItems,
  selectedItems,
  handleDeleteClick,
  setDeleteDialogShow,
}) {
  const navigate = useNavigate();

  const handleCheck = (id, isChecked) => {
    if (isChecked) {
      setSelectedItems((prevIds) => [...prevIds, id]);
    } else {
      setSelectedItems((prevIds) => prevIds.filter((i) => i !== id));
    }
  };

  return (
    <tr className="bg-white border-b  hover:bg-gray-100  ">
      <td className="w-4 p-4">
        <label className="">
          <div>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={(e) => handleCheck(item.id, e.target.checked)}
            />
          </div>
        </label>
      </td>
      <td className="px-6 py-4 font-medium text-gray-900   whitespace-nowrap">
        <div className="flex items-center">
          <img src={item.gallery[0]} className="h-12 w-12 rounded-md" />
          <div className="ml-4">
            <span className="capitalize block text-gray-800 font-semibold">
              {item.name}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">{item.category}</td>
      <td className="px-6 py-4">
        {dayjs(item.dateOfBirth).format('DD/MM/YYYY')}
      </td>
      <td className="px-6 py-4">
        <AnimalStatus status={item.status} />
      </td>
      <td className="px-6 py-4 text-left">
        <button
          onClick={() => {
            navigate(`/dashboard/animaledit/${item.id}`);
          }}
          className="border p-1 m-1 rounded-md  font-extrabold text-slate-500 cursor-pointer hover:text-gray-400"
        >
          <Icon className="w-6 h-6" icon="bx:edit" />
        </button>
        <button
          onClick={() => {
            handleDeleteClick([item.id]);
          }}
          className="border p-1 m-1 rounded-md  font-extrabold text-slate-500 cursor-pointer hover:text-gray-400"
        >
          <Icon className="w-6 h-6" icon="iconamoon:trash" />
        </button>
      </td>
    </tr>
  );
}

export default AnimalItem;
