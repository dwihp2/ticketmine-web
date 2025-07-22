import { useQuery } from '@tanstack/react-query';
import { getArtists } from '../repositories/getArtists';

export function useArtists() {
  return useQuery({
    queryKey: ['artists'],
    queryFn: () => getArtists(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
