import React from 'react';
import { Link } from 'react-router-dom';
import { useGetFeaturedEvents } from '../../hooks/querys/event';
import EventItem from './eventItem';

function Events() {
  const eventQuery = useGetFeaturedEvents();
  const events = eventQuery?.data?.data?.data;

  return (
    <section id="events">
      <div className="bg-lime-50 max-container flex justify-center">
        <div className=" section-padding">
          <div className="mx-auto mb-5 text-center md:mb-8 md:max-w-xl lg:mb-12 lg:max-w-3xl xl:max-w-[1000px]">
            <span className="text-blue-500 mb-2 block text-lg font-semibold">
              Our Events
            </span>
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 ">
              Discover our latest events
            </h2>
            <p className="font-light text-gray-500  sm:text-xl">
              Join us in making a difference. Explore our latest events -
              adoption days, fundraising initiatives, educational programs. Be
              part of our journey!
            </p>
          </div>
          <Link to={'/events'} className="button-base button-secondary my-4">
            View All
          </Link>

          {/* Event List */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {events && events.length > 0 ? (
              events.map((event) => {
                return <EventItem item={event} />;
              })
            ) : (
              <h2 className="mt-2 font-semibold text-xl">No Related Content</h2>
            )}
          </div>
          {/* Event List */}
        </div>
      </div>
    </section>
  );
}

export default Events;
