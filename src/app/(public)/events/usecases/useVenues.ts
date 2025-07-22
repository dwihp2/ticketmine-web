import { useQuery } from '@tanstack/react-query';
import { getVenues } from '../repositories/getVenues';

export function useVenues() {
  return useQuery({
    queryKey: ['venues'],
    queryFn: () => getVenues(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
