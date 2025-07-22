import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEvent } from '../repositories/updateEvent';
import type { UpdateEventInput } from '../models/interfaces/create-event';

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateEventInput) => updateEvent(data),
    onSuccess: () => {
      // Only invalidate the events list, not the detail query to prevent infinite loop
      queryClient.invalidateQueries({ queryKey: ['events'] });
      // Don't invalidate the detail query to prevent re-fetching and infinite loop
      // queryClient.invalidateQueries({ queryKey: ['event', 'detail', updatedEvent.id] });
    },
  });
}
