import { Event } from '@/events/models/interfaces/event';
import { useEvents } from '../../usecases/useEvents';
import { EventCard } from '../presentation/EventCard';
import { Skeleton } from '@/components/ui/skeleton';

export function EventListContainer({ filters = {} }) {
  const { data, isLoading, error } = useEvents(filters);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading events</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.map((event) => (
        <EventCard key={event.id} event={event as unknown as Event} />
      ))}
    </div>
  );
}
