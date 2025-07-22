"use client";

import { useState } from 'react';
import { useEvents } from '../../usecases/useEvents';
import { EventManagementCard } from '../presentation/EventManagementCard';
import { UpsertEventForm } from '../presentation/UpsertEventForm';
import { Skeleton } from '@/components/ui/skeleton';

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
          <button
            onClick={handleCreateCancel}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to Management
          </button>
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
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Create New Event
        </button>
      </div>

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p className="font-bold">Error loading events</p>
          <p>{error.message}</p>
        </div>
      )}

      {data && data.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎪</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Events Found</h3>
          <p className="text-gray-500 mb-6">Get started by creating your first event!</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Your First Event
          </button>
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
