"use client";

import { useState } from 'react';
import { UpsertEventForm } from '../presentation/UpsertEventForm';
import { EventListContainer } from './EventListContainer';

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
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create New Event
        </button>
      </div>

      <EventListContainer />
    </div>
  );
}
