import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createEvent } from '../repositories/createEvent';
import type { CreateEventInput } from '../models/interfaces/create-event';

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventInput) => createEvent(data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success("Event created successfully!", {
        description: `"${variables.name}" has been created successfully.`,
      });
    },
    onError: (error) => {
      toast.error("Failed to create event", {
        description: error instanceof Error ? error.message : "Please check your data and try again.",
      });
    },
  });
}
