import { useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function BirthPicker({ Controller, control }) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <DatePicker
            className="
      block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pl-[60px] pt-6 pb-2 text-sm font-semibold text-gray-dark transition duration-200 focus:outline-none focus:ring-0 md:pt-6 md:pb-2.5 md:text-base lg:rounded-xl 3xl:pb-3 3xl:pt-7 3xl:text-lg"
            onFocus={(e) => e.target.blur()}
            onCalendarOpen={() => setCalendarOpen(true)}
            onCalendarClose={() => setCalendarOpen(false)}
            placeholderText="Select date"
            onChange={(date) => field.onChange(date)}
            selected={field.value}
          />
        )}
      />
    </div>
  );
}

export default BirthPicker;
