"use client";

import { useState } from 'react';
import { useEvents } from '../../usecases/useEvents';
import { EventManagementCard } from '../presentation/EventManagementCard';
import { UpsertEventForm } from '../presentation/UpsertEventForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Plus } from 'lucide-react';

export function EventManagementContainer() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data, isLoading, error } = useEvents();

  const handleCreateSuccess = () => {
    setShowCreateForm(false);
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
  };

  if (showCreateForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleCreateCancel}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Management
          </Button>
        </div>
        <UpsertEventForm onSuccess={handleCreateSuccess} onCancel={handleCreateCancel} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Event Management</h1>
          <p className="text-gray-600 mt-2">Create, edit, and manage your events</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Event
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            <p className="font-bold">Error loading events</p>
            <p>{error.message}</p>
          </AlertDescription>
        </Alert>
      )}

      {data && data.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎪</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Found</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first event!</p>
          <Button
            onClick={() => setShowCreateForm(true)}
          >
            Create Your First Event
          </Button>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Showing {data.length} event{data.length !== 1 ? 's' : ''}
            </p>
            {/* TODO: Add filtering/sorting options */}
          </div>

          {data.map((event) => (
            <EventManagementCard
              key={event.id}
              event={event}
            />
          ))}
        </div>
      )}
    </div>
  );
}
