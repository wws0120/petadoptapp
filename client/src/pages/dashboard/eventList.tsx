import { useState, useEffect } from 'react';
import Pagination from '../../components/shared/pagination';
import EventItem from '../../components/dashboard/events/eventItem';
import EventListToolbar from '../../components/dashboard/events/eventListToolbar';
import {
  useGetEventlist,
  useDeleteEventMutation,
} from '../../hooks/querys/event';

import DeleteEventDialog from '../../components/dashboard/events/deleteEventDialog';

function EventList() {
  const [page, setPage] = useState(1);
  const [deleteDialogShow, setDeleteDialogShow] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [itemsToBeDeleted, setItemsToBeDeleted] = useState([]);
  const { mutateAsync: deleteEventMutation } = useDeleteEventMutation();

  const toggleSelectAll = () => {
    if (!isAllSelected) {
      setSelectedItems(events.map((item) => item.id));
      setIsAllSelected(true);
    } else {
      setSelectedItems([]);
      setIsAllSelected(false);
    }
  };

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useGetEventlist(page);
  const events = data?.data?.events;

  useEffect(() => {
    setIsAllSelected(false);
  }, [page]);

  const handleDeleteClick = (items) => {
    setItemsToBeDeleted(items);
    setDeleteDialogShow(true);
  };
  const confirmDeletion = () => {
    deleteEventMutation(itemsToBeDeleted);
    setDeleteDialogShow(false);
  };

  return (
    <>
      <div className="container mx-auto p-6 sm:p-10 space-y-6 min-h-[calc(100vh-138px)]  relative pb-14 ">
        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
          <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
            <div className="h-full">
              <div>
                <h4 className="font-bold text-2xl">Event Lists</h4>
                <EventListToolbar selectedItems={selectedItems} />
              </div>
              <div>
                <div className="relative overflow-x-auto  sm:rounded">
                  <table
                    className="w-full text-sm text-left text-gray-500 "
                    id="datatable_1"
                  >
                    <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                      <tr>
                        <th scope="col" className="p-4">
                          <label className="custom-label">
                            <div>
                              <input
                                type="checkbox"
                                checked={isAllSelected}
                                onChange={() => {
                                  toggleSelectAll();
                                }}
                              />
                            </div>
                          </label>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Event
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>

                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                        <th scope="col " className="sr-only">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {events &&
                        events.map((data, index) => {
                          return (
                            <EventItem
                              key={index}
                              item={data}
                              selectedItems={selectedItems}
                              setSelectedItems={setSelectedItems}
                              handleDeleteClick={handleDeleteClick}
                            />
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          isPreviousData={isPreviousData}
          totalPages={data ? data?.data?.totalPages : 0}
          page={page}
          setPage={setPage}
        />
      </div>
      {deleteDialogShow && (
        <DeleteEventDialog
          setDialogShow={setDeleteDialogShow}
          confirmDeletion={confirmDeletion}
        />
      )}
    </>
  );
}

export default EventList;
