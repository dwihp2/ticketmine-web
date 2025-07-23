"use client";

import { useState } from 'react';
import { UpsertEventForm } from '../presentation/UpsertEventForm';
import { EventListContainer } from './EventListContainer';
import { Button } from '@/components/ui/button';

export function EventCreateContainer() {
  const [showForm, setShowForm] = useState(false);

  const handleSuccess = () => {
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <UpsertEventForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Event Management</h1>
        <Button
          onClick={() => setShowForm(true)}
        >
          Create New Event
        </Button>
      </div>

      <EventListContainer />
    </div>
  );
}
