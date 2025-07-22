import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { deleteEvent } from '../repositories/deleteEvent';

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success("Event deleted successfully!", {
        description: "The event has been permanently removed.",
      });
    },
    onError: (error) => {
      toast.error("Failed to delete event", {
        description: error instanceof Error ? error.message : "Please try again.",
      });
    },
  });
}
