import React from 'react';
import { formatEnum } from '../../utils/helper';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
function EventItemType({ category }) {
  const badgeColor = (category) => {
    return category === 'EDUCATION_DAY'
      ? 'bg-sky-100'
      : category === 'ADOPTION_EVENT'
      ? 'bg-orange-100'
      : category === 'FUNDRAISING_EVENT'
      ? 'bg-teal-100'
      : 'bg-pink-100';
  };

  return (
    <Link
      to={`/events?category=${category.toLowerCase()}`}
      className={clsx(
        'inline-block px-3 py-1 rounded-md text-[13px] xsm:text-[11px] tracking-[1px] leading-[25px] text-black  font-bold uppercase ',
        badgeColor(category)
      )}
    >
      {formatEnum(category)}
    </Link>
  );
}

export default EventItemType;
