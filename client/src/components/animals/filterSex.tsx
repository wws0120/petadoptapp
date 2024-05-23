import React from 'react';

function FilterSex({ sexValue, setSexValue }) {
  const handleInputChange = (e) => {
    setSexValue(e.target.checked ? e.target.value : '');
  };

  return (
    <fieldset className="mb-2 py-4">
      <label className="font-semibold">Sex:</label>
      <div className="flex items-center mb-2">
        <input
          type="radio"
          name="sex"
          value="male"
          id="male"
          checked={sexValue == 'male'}
          className="h-4 w-4 border-gray-300 "
          onChange={handleInputChange}
        />
        <label
          htmlFor="male"
          className="text-sm font-medium text-gray-900 ml-2 block"
        >
          Male
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="radio"
          name="sex"
          id="female"
          value="female"
          checked={sexValue == 'female'}
          className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
          onChange={handleInputChange}
        />
        <label
          htmlFor="female"
          className="text-sm font-medium text-gray-900 ml-2 block"
        >
          Female
        </label>
      </div>
    </fieldset>
  );
}

export default FilterSex;
