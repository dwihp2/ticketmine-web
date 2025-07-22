import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEvent } from '../repositories/createEvent';
import type { CreateEventInput } from '../models/interfaces/create-event';

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventInput) => createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      console.log("✅ Event created successfully");
    },
    onError: (error) => {
      console.error("❌ Event creation failed:", error.message);
    },
  });
}
