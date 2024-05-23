import { Link } from 'react-router-dom';
import * as dayjs from 'dayjs';
import { formatEnum } from '../../utils/helper';

function EventItem({ item }) {
  return (
    <div className="flex-shrink max-w-full w-full sm:w-1/3 lg:w-1/4 px-3 pb-3 pt-3 sm:pt-0 border-b-2 sm:border-b-0 border-dotted border-gray-100">
      <div className="flex flex-row sm:block bg-gray-100 p-3 rounded-md ">
        <Link to={`/event/${item.id}`}>
          <div className="w-full">
            <img
              className="max-w-1/3 object-cover aspect-[4/3]  mx-auto"
              src={item.coverImage}
              alt={item.title}
            />
          </div>
          <div className="py-0 sm:py-3 pl-3 sm:pl-0">
            <h3 className="text-xl font-bold text-teal-600 leading-tight">
              <span>{item.title}</span>
            </h3>
            <div className="text-sm text-gray-400 mb-2">
              {dayjs(item.eventDate).format('MMMM D, YYYY')}
            </div>
            <p className="text-slate-600 leading-tight  line-clamp-3  mb-2">
              {item.content}
            </p>
            <div className="mb-4">
              <a className=" text-slate-500 " href="#">
                <span className="inline-block h-3 border-l-2 border-teal-500 mr-2 " />
                {formatEnum(item.category)}
              </a>
            </div>
            <button className="button-tertiary button-base">Read More</button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EventItem;
