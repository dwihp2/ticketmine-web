'use client';

import { useQuery } from '@tanstack/react-query';
import { getFeaturedEvents } from '../repositories/getFeaturedEvents';
import type { FeaturedEvent } from '../repositories/getFeaturedEvents';

export function useFeaturedEvents(limit: number = 6) {
  return useQuery<FeaturedEvent[]>({
    queryKey: ['featured-events', limit],
    queryFn: () => getFeaturedEvents(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}
