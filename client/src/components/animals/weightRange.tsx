import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function WeightRange({
  minWeightValue,
  maxWeightValue,
  setMinWeightValue,
  setMaxWeightValue,
}) {
  function handleRangeChange(value: any) {
    setMinWeightValue(value[0]);
    setMaxWeightValue(value[1]);
  }
  function handleMaxChange(max: number) {
    setMaxWeightValue(max);
  }
  function handleMinChange(min: number) {
    setMinWeightValue(min);
  }
  return (
    <div className="py-4">
      <label className="font-semibold">Weight(KG):</label>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <input
          className="h-8 p-1 rounded-lg bg-white border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 "
          type="number"
          value={minWeightValue}
          onChange={(e) => handleMinChange(parseInt(e.target.value))}
          min="0"
          max={maxWeightValue}
        />
        <input
          className="h-8 p-1 rounded-lg bg-white border-gray-200 text-sm text-gray-900 outline-none focus:border-gray-900 focus:outline-none focus:ring-0 "
          type="number"
          value={maxWeightValue}
          onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          min={minWeightValue}
        />
      </div>
      <Slider
        range
        defaultValue={[0, 100]}
        min={0}
        max={100}
        value={[minWeightValue, maxWeightValue]}
        allowCross={false}
        onChange={(value) => handleRangeChange(value)}
      />
    </div>
  );
}
