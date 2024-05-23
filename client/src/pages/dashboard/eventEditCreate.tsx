import EventForm from '../../components/dashboard/events/eventForm';
import { useGetEventContent } from '../../hooks/querys/event';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

export default function EventEditCreate() {
  const { id } = useParams();

  const eventContentQuery = useGetEventContent(id);
  const eventData = eventContentQuery.data
    ? eventContentQuery.data.data
    : {
        id: null,
        title: null,
        coverImage: null,
        category: null,
        content: null,
        eventDate: null,
        startTime: null,
        endTime: null,
        status: null,
      };

  return (
    <div className="p-4">
      <h4 className="font-bold text-2xl">
        {id ? 'Edit Event' : 'Create Event'}
      </h4>
      <EventForm event={eventData} />
    </div>
  );
}
