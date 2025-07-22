"use client";

import { useRouter } from 'next/navigation';
import { useEventDetail } from '../../usecases/useEventDetail';
import { UpsertEventForm } from '../presentation/UpsertEventForm';
import { Skeleton } from '@/components/ui/skeleton';

interface EventEditContainerProps {
  eventId: string;
}

export function EventEditContainer({ eventId }: EventEditContainerProps) {
  const router = useRouter();
  const { data: event, isLoading, error } = useEventDetail(parseInt(eventId));

  const handleSuccess = () => {
    router.push('/events/manage');
    router.refresh();
  };

  const handleCancel = () => {
    router.push('/events/manage');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <h3 className="text-lg font-medium text-red-800">Error Loading Event</h3>
            <p className="text-red-600 mt-2">
              {error instanceof Error ? error.message : 'Failed to load event details'}
            </p>
            <button
              onClick={() => router.push('/events/manage')}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Back to Manage Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <h3 className="text-lg font-medium text-yellow-800">Event Not Found</h3>
            <p className="text-yellow-600 mt-2">
              The event with ID {eventId} could not be found.
            </p>
            <button
              onClick={() => router.push('/events/manage')}
              className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            >
              Back to Manage Events
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => router.push('/events/manage')}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
        >
          ← Back to Manage Events
        </button>
      </div>

      <UpsertEventForm
        event={event}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}
