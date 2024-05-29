import * as dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import EventItemType from './eventItemType';

function eventItem({ item }) {
  return (
    <div className="group flex flex-col  gap-x-2 gap-y-4 xl:gap-x-6 xl:gap-y-8 rounded-[20px] bg-[#fbfbf6] p-5 xl:flex-row">
      <Link
        to={`/event/${item.id}`}
        className="h-[230px] w-full overflow-hidden rounded-[10px] xl:w-[250px]"
      >
        <img
          src={item.coverImage}
          alt="event-image"
          width={856}
          height={450}
          className="h-full w-full scale-100 object-cover transition-all duration-300 ease-linear group-hover:scale-105"
        />
      </Link>
      <div className="flex-1 ">
        <div>
          <div className="mb-2 xl:mb-6 text-sm">
            <EventItemType category={item.category} />{' '}
          </div>
          <Link
            to={`/eventcontent/${item.id}`}
            className="text-2xl md:text-xl font-bold leading-[1.33] text-black  transition-all duration-300 group-hover:text-teal-500 lg:text-2xl"
          >
            {item.title}
          </Link>

          <div className="mt-1.5 flex gap-2 items-center text-sm font-semibold text-amber-500">
            <Icon icon="mage:calendar-2" className="inline-block" />
            <span>
              {/*dayjs(item.eventDate).format('MMMM D, YYYY')*/} test for error
              this is the date
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default eventItem;
