import { useQuery } from '@tanstack/react-query';
import { getEventCategories } from '../repositories/getEventCategories';

export function useEventCategories() {
  return useQuery({
    queryKey: ['event-categories'],
    queryFn: () => getEventCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
