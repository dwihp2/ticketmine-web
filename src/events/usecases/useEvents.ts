import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../repositories/getEvents';
import type { EventFilters } from '../models/types/event-filters';

export function useEvents(filters: EventFilters = {}) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => getEvents(filters),
    staleTime: 5 * 60 * 1000,
  });
}
