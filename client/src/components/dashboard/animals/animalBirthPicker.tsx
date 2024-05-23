import { useState } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function AnimalBirthPicker({ Controller, control }) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <label
        className="
          pointer-events-none  font-mono block text-xl mt-4 font-medium text-gray-900 "
      >
        Animal Birthday
      </label>

      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field }) => (
          <DatePicker
            className="
            bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full"
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

export default AnimalBirthPicker;
