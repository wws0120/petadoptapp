import React from 'react';
import clsx from 'clsx';

function Badge({ text, color = 'text-yellow-600 bg-yellow-100' }) {
  return (
    <span className="font-serif">
      <span
        className={clsx(
          'inline-flex px-2 text-xs font-medium leading-5 rounded-full ',
          text,
          color
        )}
      >
        {text}
      </span>
    </span>
  );
}

export default Badge;
