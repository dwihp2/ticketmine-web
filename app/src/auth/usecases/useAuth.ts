import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../repositories/authRepository';
import { useAuthStore } from './useAuthStore';

export function useAuth() {
  const { user, status, setUser } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  // Update store when query data changes
  if (data !== user) {
    setUser(data || null);
  }

  return {
    user: data || user,
    isAuthenticated: !!data,
    isLoading: isLoading || status === 'loading',
    error,
  };
}