import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FilteredResult from '../../components/animals/filteredResult';
import FilterSidebar from '../../components/animals/filterSidebar';
import FilterDrawer from '../../components/animals/filterDrawer';
import { useGetFilteredAnimals } from '../../hooks/querys/animal';
import { Icon } from '@iconify/react';

function Animals() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const categories = searchParams.get('categories')?.split(',') ?? [];
  const sex = searchParams.get('sex') || '';
  const minAge = searchParams.get('minAge') || '';
  const maxAge = searchParams.get('maxAge') || '';
  const minWieght = searchParams.get('minWieght') || '';
  const maxWieght = searchParams.get('maxWieght') || '';

  const animalQuery = useGetFilteredAnimals({
    categories,
    sex,
    minAge,
    maxAge,
    minWieght,
    maxWieght,
  });
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
  } = animalQuery;

  return (
    <div className="bg-orange-50">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[330px_1fr] 3xl:gap-12">
        <div className="hidden lg:block">
          <FilterSidebar
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <div className="w-full mx-auto p-2 sm:p-4 md:p-5">
          <div
            onClick={() => {
              setDrawerOpen(true);
            }}
            className="flex justify-center items-center p-2 h-10 w-10 mb-4 rounded-md bg-gray-50 lg:hidden cursor-pointer hover:bg-gray-100 "
          >
            <Icon className="h-8 w-8" icon="eva:options-2-outline" />
          </div>
          <FilteredResult data={data} />
          <div className="flex justify-center w-full ">
            <button
              className="px-8 py-3 border rounded-md bg-white text-orange-700 font-bold uppercase"
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
            </button>
          </div>
        </div>
      </div>

      <FilterDrawer
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
      />
    </div>
  );
}

export default Animals;
