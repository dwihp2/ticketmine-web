"use client";
import { useEventDetail } from '../../usecases/useEventDetail';
import { EventDetailCard } from '../presentation/EventDetailCard';
import { Skeleton } from '@/components/ui/skeleton';

export function EventDetailContainer({ eventId }: { eventId: number }) {
  const { data, isLoading, error } = useEventDetail(eventId);

  if (isLoading) {
    return <Skeleton className="h-96 w-full" />;
  }
  if (error) {
    return <div>Error loading event details</div>;
  }
  if (!data) {
    return <div>No event found</div>;
  }
  return <EventDetailCard event={data} />;
}
