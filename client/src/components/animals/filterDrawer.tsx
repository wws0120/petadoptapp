import { useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

import useOnClickOutside from '../../hooks/utils/useOnClickOutside';

import AgeRange from './ageRange';
import WeightRange from './weightRange';
import FilterCategories from './filterCategories';
import FilterSex from './filterSex';

export default function FilterDrawer({
  searchParams,
  setSearchParams,
  setDrawerOpen,
  drawerOpen,
}) {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(drawerRef, () => setDrawerOpen(false));

  const [categoriesValue, setCategoriesValue] = useState(
    searchParams.get('categories')?.split(',') ?? []
  );
  const [sexValue, setSexValue] = useState(searchParams.get('sex') ?? '');
  const [minAgeValue, setMinAgeValue] = useState(
    searchParams.get('minAge') ?? 0
  );
  const [maxAgeValue, setMaxAgeValue] = useState(
    searchParams.get('maxAge') ?? 100
  );
  const [minWeightValue, setMinWeightValue] = useState(
    searchParams.get('minWeight') ?? 0
  );
  const [maxWeightValue, setMaxWeightValue] = useState(
    searchParams.get('maxWeight') ?? 100
  );
  const navigate = useNavigate();

  const handleSubmit = () => {
    setSearchParams({
      sex: sexValue,
      categories: categoriesValue.join(','),
      minAge: minAgeValue,
      maxAge: maxAgeValue,
      minWeight: minWeightValue,
      maxWeight: maxWeightValue,
    });
  };
  return (
    <div
      className={`fixed inset-0 bg-gray-600/60  backdrop-blur  transition-all ease-in-out duration-200 transform ${
        drawerOpen ? 'opacity-100 z-50' : 'opacity-0 -z-50'
      }`}
    >
      <div
        ref={drawerRef}
        className={`relative h-screen bg-white opacity-100 xl:p-4 transition-all ease-in-out duration-200 transform ${
          drawerOpen ? 'w-5/6' : 'w-0'
        }`}
      >
        <div className="mb-4 flex items-center justify-between  uppercase ">
          <div className="grid grid-cols-1 gap-8 ">
            <div className="ease-[cubic-bezier(0.33, 1, 0.68, 1)] relative mb-5 p-5 overflow-hidden rounded-lg bg-white shadow-card transition-all duration-[350ms] last:mb-0 hover:shadow-transaction  shadow-transaction">
              <div className="flex pb-4 h-13 w-full items-center justify-between text-lg font-semibold uppercase tracking-wider text-gray-900">
                Filter Animals
              </div>
              <FilterCategories
                categoriesValue={categoriesValue}
                setCategoriesValue={setCategoriesValue}
              />

              <AgeRange
                minAgeValue={minAgeValue}
                maxAgeValue={maxAgeValue}
                setMinAgeValue={setMinAgeValue}
                setMaxAgeValue={setMaxAgeValue}
              />
              <WeightRange
                minWeightValue={minWeightValue}
                maxWeightValue={maxWeightValue}
                setMinWeightValue={setMinWeightValue}
                setMaxWeightValue={setMaxWeightValue}
              />
              <FilterSex sexValue={sexValue} setSexValue={setSexValue} />
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="button-base button-quaternary"
              >
                Find
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="absolute right-0 top-0">
            <div className="flex items-center justify-end py-2 ">
              {/* CLOSE BUTTON FOR MOBILE */}
              <div>
                <button
                  className="p-2 ml:auto text-slate-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setDrawerOpen(false)}
                >
                  <Icon icon="ic:round-close" className="h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
