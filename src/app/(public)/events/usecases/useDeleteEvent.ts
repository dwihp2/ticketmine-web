import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEvent } from '../repositories/deleteEvent';

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      console.log("✅ Event deleted successfully");
    },
    onError: (error) => {
      console.error("❌ Event deletion failed:", error.message);
    },
  });
}
