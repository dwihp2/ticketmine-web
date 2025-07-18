
import { useQuery } from '@tanstack/react-query';

export function useEventDetail(eventId: number) {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: async () => {
      const res = await fetch(`/api/events/${eventId}`);
      if (!res.ok) throw new Error('Failed to fetch event detail');
      const event = await res.json();
      // Convert date fields to string for UI compatibility
      if (event && event.date) event.date = String(event.date);
      if (event && event.created_at) event.created_at = String(event.created_at);
      return event;
    },
    staleTime: 5 * 60 * 1000,
  });
}
