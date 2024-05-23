import React from 'react';

function FilterCategories({ categoriesValue, setCategoriesValue }) {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const optionValue = e.target.value;
    const isChecked = categoriesValue.includes(optionValue);
    if (isChecked) {
      setCategoriesValue((prevCategories: string[]) =>
        prevCategories.filter(
          (category) => category !== optionValue && category !== undefined
        )
      );
    } else {
      setCategoriesValue((prevCategories: string[]) => [
        ...prevCategories,
        optionValue,
      ]);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 flex-wrap justify-center py-4">
        <label className="font-semibold">Type:</label>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="all"
            value="dog"
            checked={categoriesValue.includes('dog')}
            className="w-5"
            onChange={(e) => {
              handleCheckboxChange(e);
            }}
          />
          <span>Dog</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="rent"
            value="cat"
            checked={categoriesValue.includes('cat')}
            className="w-5"
            onChange={(e) => {
              handleCheckboxChange(e);
            }}
          />
          <span>Cat</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="sale"
            value="small_mammal"
            checked={categoriesValue.includes('small_mammal')}
            className="w-5"
            onChange={(e) => {
              handleCheckboxChange(e);
            }}
          />
          <span>Small Mammel</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="offer"
            value="bird"
            checked={categoriesValue.includes('bird')}
            className="w-5"
            onChange={(e) => {
              handleCheckboxChange(e);
            }}
          />
          <span>Bird</span>
        </div>
        <div className="flex gap-2">
          <input
            type="checkbox"
            id="offer"
            value="reptile"
            checked={categoriesValue.includes('reptile')}
            className="w-5"
            onChange={(e) => {
              handleCheckboxChange(e);
            }}
          />
          <span>Reptile</span>
        </div>
      </div>
    </>
  );
}

export default FilterCategories;
