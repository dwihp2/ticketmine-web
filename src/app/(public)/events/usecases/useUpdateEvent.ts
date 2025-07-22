import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateEvent } from '../repositories/updateEvent';
import type { UpdateEventInput } from '../models/interfaces/create-event';

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateEventInput) => updateEvent(data),
    onSuccess: (updatedEvent) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['event', 'detail', updatedEvent.id] });
      console.log("✅ Event updated successfully");
    },
    onError: (error) => {
      console.error("❌ Event update failed:", error.message);
    },
  });
}
