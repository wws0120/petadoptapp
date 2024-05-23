import { useParams } from 'react-router-dom';
import { useGetEventContent } from '../../hooks/querys/event';
import { Icon } from '@iconify/react';

export default function EventContent() {
  const { id } = useParams();
  const eventContentQuery = useGetEventContent(id);
  const event = eventContentQuery?.data?.data;

  return (
    <div className="w-full bg-[#EDEDE0] ">
      <div className="max-w-5xl mx-auto min-h-screen  pt-10 pb-20 space-y-10">
        <div className=" space-y-5">
          <h1 className=" text-4xl font-bold ">{event?.title}</h1>
        </div>

        <div className="w-full max-w-2xl aspect-video relative">
          <img
            src={event?.coverImage}
            alt="cover"
            className=" object-cover object-center rounded-md border-[0.5px] border-zinc-400"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div>
          <ul className="flex flex-wrap items-center mt-3 mb-0 text-gray-600">
            <li className="ml-4 ">
              <div className="flex items-center">
                <div className="ml-2 ">
                  <p className="mb-0 flex items-center">
                    <Icon className="mr-2" icon="ion:calendar-outline" />
                    {new Date(event?.eventDate).toDateString()}
                  </p>
                </div>
              </div>
            </li>
            <li className="ml-4 ">
              <div className="flex items-center">
                <div className="ml-2  flex-grow-1">
                  <p className="mb-0 flex items-center ">
                    <Icon className="mr-2" icon="tdesign:time" />
                    {event?.startTime} - {event?.endTime}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div className=" text-gray-700 border-[0.5px] rounded-md border-zinc-300 ">
          <div className="overflow-x-auto w-full">
            <div className="p-5 sm:p-10">
              <div className="article">
                <p>{event?.content}</p>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
