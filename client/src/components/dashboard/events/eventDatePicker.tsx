import { useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EventDatePicker({ Controller, control }) {
  const [state, setState] = useState(false);

  return (
    <div className="flex flex-col">
      <label
        className="
        pointer-events-none font-mono block text-xl mt-4 font-medium text-gray-900"
      >
        Event Date
      </label>

      <Controller
        control={control}
        name="eventDate"
        render={({ field }) => (
          <DatePicker
            className="
      block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pl-[60px] pt-6 pb-2 text-sm font-semibold text-gray-dark transition duration-200 focus:outline-none focus:ring-0 md:pt-6 md:pb-2.5 md:text-base lg:rounded-xl 3xl:pb-3 3xl:pt-7 3xl:text-lg"
            onFocus={(e) => e.target.blur()}
            onCalendarOpen={() => setState(true)}
            onCalendarClose={() => setState(false)}
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value}
          />
        )}
      />
    </div>
  );
}

export default EventDatePicker;
