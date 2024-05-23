import EventItem from '../../components/events/eventItem';
import PageHeader from '../../components/shared/pageHeader';
import { useGetEvents } from '../../hooks/querys/event';
import bgImg from '../../assets/eventback.webp';
import { useSearchParams } from 'react-router-dom';

export default function News() {
  let [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const categorySearchParams = category ? category.toUpperCase() : undefined;
  const eventQuery = useGetEvents(categorySearchParams);
  const {
    fetchNextPage, //function
    hasNextPage, // boolean
    isFetchingNextPage, // boolean
    data,
    status,
    error,
  } = eventQuery;

  const queryContent = data?.pages.map((page) => {
    return page.data.data.map((data, i) => {
      return <EventItem key={`event-${i}`} item={data} />;
    });
  });

  return (
    <div className="bg-orange-50">
      <PageHeader
        pageHeader="Our Events"
        pageSubHeader="Exporing our events"
        background={bgImg}
      />
      <div className="xl:container mx-auto px-3 sm:px-4 xl:px-2">
        <div className="flex flex-row flex-wrap">
          <div className="flex-shrink max-w-full w-full overflow-hidden">
            <div className="w-full py-3"></div>
            <div className="flex flex-row flex-wrap mb-4 -mx-3">
              {queryContent}
            </div>
            <div className="flex justify-center w-full mb-6">
              <button
                className="px-8 py-3 border rounded-md bg-white text-teal-600 font-bold uppercase"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {isFetchingNextPage
                  ? 'Loading more...'
                  : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
