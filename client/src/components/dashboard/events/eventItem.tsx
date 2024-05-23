import { Icon } from '@iconify/react';

import { useState, useRef } from 'react';
import { useUpdateEventMutation } from '../../../hooks/querys/event';
import useOnClickOutside from '../../../hooks/utils/useOnClickOutside';
import EventStatus from './eventStatus';
import EditMenuItem from './editMenuItem';

import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

function EventItem({
  item,
  setSelectedItems,
  selectedItems,
  handleDeleteClick,
}) {
  const [editMenuShow, setEditMenuShow] = useState(false);
  const navigate = useNavigate();

  const handleCheck = (id, isChecked) => {
    if (isChecked) {
      setSelectedItems((prevIds) => [...prevIds, id]);
    } else {
      setSelectedItems((prevIds) => prevIds.filter((i) => i !== id));
    }
  };

  const menuRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(menuRef, () => setEditMenuShow(false));

  const { mutateAsync: setEventStatusMutation } = useUpdateEventMutation();

  const menuItems = [
    {
      title: 'EDIT',
      icon: 'akar-icons:edit',
      action: () => {
        navigate(`/dashboard/eventedit/${item.id}`);
      },
    },
    {
      title: `${item.status === 'ACTIVE' ? 'DEACTIVE EVENT' : 'ACTIVE EVENT'}`,
      icon: 'lucide:settings-2',
      action: () => {
        setEventStatusMutation({
          eventId: item.id,
          payload: {
            status: `${item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'}`,
          },
        });
      },
    },
    {
      title: 'DELETE',
      icon: 'gg:trash',
      action: () => {
        handleDeleteClick([item.id]);
      },
    },
  ];

  return (
    <tr className="bg-white hover:bg-gray-100  w-full">
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
      <td scope="row" className="px-6 py-4 font-medium text-gray-900 ">
        <div className="flex items-center">
          <img src={item.coverImage} className="w-20  block rounded-md" />
          <div className="ml-4  ">
            <span className="text-sm text-gray-600">{item.title} </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {dayjs(item.eventDate).format('DD-MM-YYYY')}
      </td>
      <td className="px-6 py-4">{<EventStatus status={item.status} />}</td>
      <td className="px-6 py-4 text-right">
        <div className="relative text-2xl font-extrabold text-slate-500 cursor-pointer ">
          <Icon
            className="hover:text-gray-400"
            icon="iconamoon:menu-kebab-vertical-circle-light"
            onClick={() => setEditMenuShow(true)}
          />
          {editMenuShow && (
            <div
              ref={menuRef}
              className="absolute left-[-10rem] z-20 w-48 mt-2 overflow-hidden origin-top-right bg-white border border-inherit rounded-md shadow-xl "
            >
              {menuItems.map((item) => (
                <EditMenuItem
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                  action={item.action}
                />
              ))}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default EventItem;
