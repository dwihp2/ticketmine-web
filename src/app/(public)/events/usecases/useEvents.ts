
import { useQuery } from '@tanstack/react-query';
import type { EventFilters } from '../models/types/event-filters';
import { getEvents } from '../repositories/getEvents';

export function useEvents(filters: EventFilters = {}) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: () => getEvents(filters),
    staleTime: 5 * 60 * 1000,
  });
}
