"use client";

import { useRouter } from 'next/navigation';
import { useEventDetail } from '../../usecases/useEventDetail';
import { UpsertEventForm } from '../presentation/UpsertEventForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft } from 'lucide-react';

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
          <Alert variant="destructive">
            <AlertTitle>Error Loading Event</AlertTitle>
            <AlertDescription>
              {error instanceof Error ? error.message : 'Failed to load event details'}
            </AlertDescription>
            <div className="mt-4">
              <Button
                variant="destructive"
                onClick={() => router.push('/events/manage')}
              >
                Back to Manage Events
              </Button>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Alert variant="default">
            <AlertTitle>Event Not Found</AlertTitle>
            <AlertDescription>
              The event with ID {eventId} could not be found.
            </AlertDescription>
            <div className="mt-4">
              <Button
                variant="secondary"
                onClick={() => router.push('/events/manage')}
              >
                Back to Manage Events
              </Button>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.push('/events/manage')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Manage Events
        </Button>
      </div>

      <UpsertEventForm
        event={event}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
}
