import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function AgeRange({
  minAgeValue,
  maxAgeValue,
  setMinAgeValue,
  setMaxAgeValue,
}) {
  function handleRangeChange(value: any) {
    setMinAgeValue(value[0]);
    setMaxAgeValue(value[1]);
  }
  function handleMaxChange(max: number) {
    setMaxAgeValue(max);
  }
  function handleMinChange(min: number) {
    setMinAgeValue(min);
  }
  return (
    <div className="py-4">
      <label className="font-semibold">Age:</label>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <input
          className="h-8 p-1 rounded-lg bg-white border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 "
          type="number"
          value={minAgeValue}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
          min="0"
          max={maxAgeValue}
        />
        <input
          className="h-8 p-1 rounded-lg bg-white border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 "
          type="number"
          value={maxAgeValue}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          min={minAgeValue}
        />
      </div>
      <Slider
        range
        defaultValue={[0, 100]}
        min={0}
        max={100}
        value={[minAgeValue, maxAgeValue]}
        allowCross={false}
        onChange={(value) => handleRangeChange(value)}
      />
    </div>
  );
}
