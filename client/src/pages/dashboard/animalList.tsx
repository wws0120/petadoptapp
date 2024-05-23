import { useState, useEffect } from 'react';
import Pagination from '../../components/shared/pagination';
import AnimalItem from '../../components/dashboard/animals/animalItem';
import AnimalListToolbar from '../../components/dashboard/animals/animalListToolbar';
import DeleteAnimalDialog from '../../components/dashboard/animals/deleteAnimalDialog';
import {
  useGetAnimalList,
  useDeleteAnimalMutation,
} from '../../hooks/querys/animal';

function AnimalList() {
  const [page, setPage] = useState(1);
  const [deleteDialogShow, setDeleteDialogShow] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const [itemsToBeDeleted, setItemsToBeDeleted] = useState([]);

  const { mutateAsync: deleteAnimalMutation } = useDeleteAnimalMutation();

  const toggleSelectAll = () => {
    if (!isAllSelected) {
      setSelectedItems(animalsData.map((item) => item.id));
      setIsAllSelected(true);
    } else {
      setSelectedItems([]);
      setIsAllSelected(false);
    }
  };

  useEffect(() => {
    setIsAllSelected(false);
  }, [page]);

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useGetAnimalList(page);
  const animalsData = data?.data?.animals;

  const handleDeleteClick = (items) => {
    setItemsToBeDeleted(items);
    setDeleteDialogShow(true);
  };
  const confirmDeletion = () => {
    deleteAnimalMutation(itemsToBeDeleted);
    setDeleteDialogShow(false);
  };

  return (
    <>
      <div className="container mx-auto p-6 sm:p-10 space-y-6 min-h-[calc(100vh-138px)]  relative pb-14 ">
        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
          <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
            <div className="h-full">
              <div>
                <h4 className="font-bold text-2xl">Animal Lists</h4>
                <AnimalListToolbar
                  selectedItems={selectedItems}
                  handleDeleteClick={handleDeleteClick}
                />
              </div>

              <div className="">
                <div className="relative overflow-x-auto  sm:rounded">
                  <table
                    className="w-full text-sm text-left text-gray-500 "
                    id="datatable_1"
                  >
                    <thead className="text-xs text-gray-700 uppercase bg-slate-100  ">
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
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date of Birth
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
                      {animalsData &&
                        animalsData.map((data, index) => {
                          return (
                            <AnimalItem
                              key={index}
                              item={data}
                              selectedItems={selectedItems}
                              setSelectedItems={setSelectedItems}
                              handleDeleteClick={handleDeleteClick}
                              setDeleteDialogShow={setDeleteDialogShow}
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
        <DeleteAnimalDialog
          setDialogShow={setDeleteDialogShow}
          confirmDeletion={confirmDeletion}
        />
      )}
    </>
  );
}

export default AnimalList;
