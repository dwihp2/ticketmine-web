import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../repositories/getUserProfile';

export function useUserProfile(userId: string) {
  return useQuery({
    queryKey: ['user', 'profile', userId],
    queryFn: () => getUserProfile(userId),
    staleTime: 5 * 60 * 1000,
  });
}
