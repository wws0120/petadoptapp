import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import AgeRange from './ageRange';
import WeightRange from './weightRange';
import FilterCategories from './filterCategories';
import FilterSex from './filterSex';

export default function Filter({ searchParams, setSearchParams }) {
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
    <div className=" relative h-full overflow-y-auto bg-white xl:p-4 ">
      <div className="mb-4 flex items-center justify-between  uppercase ">
        <div className="grid grid-cols-1 gap-8 ">
          <div className="ease-[cubic-bezier(0.33, 1, 0.68, 1)] relative mb-5 p-5 overflow-hidden rounded-lg bg-white shadow-card transition-all duration-[350ms] last:mb-0 hover:shadow-transaction  shadow-transaction">
            <div className="flex pb-2 h-13 w-full items-center justify-between text-lg font-semibold uppercase tracking-wider text-gray-900">
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
    </div>
  );
}
