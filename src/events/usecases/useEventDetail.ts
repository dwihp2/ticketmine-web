import { useQuery } from '@tanstack/react-query';
import { getEventDetail } from '../repositories/getEventDetail';

export function useEventDetail(eventId: number) {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEventDetail(eventId),
    staleTime: 5 * 60 * 1000,
  });
}
