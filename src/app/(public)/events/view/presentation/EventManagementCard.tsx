"use client";

import type { Event } from '../../models/interfaces/event';
import Image from 'next/image';
import Link from 'next/link';
import { useDeleteEvent } from '../../usecases/useDeleteEvent';

interface EventManagementCardProps {
  event: Event;
}

export function EventManagementCard({ event }: EventManagementCardProps) {
  const deleteEventMutation = useDeleteEvent();

  // Format the date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${event.name}"? This action cannot be undone.`)) {
      try {
        await deleteEventMutation.mutateAsync(event.id);
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex gap-4">
        {/* Event Image */}
        <div className="flex-shrink-0">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.name}
              width={120}
              height={80}
              className="w-30 h-20 object-cover rounded-md"
            />
          ) : (
            <div className="w-30 h-20 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold truncate pr-2">{event.name}</h3>
            <div className="flex items-center gap-2">
              {event.is_featured && (
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                  Featured
                </span>
              )}
              <span className={`text-xs px-2 py-1 rounded-full capitalize whitespace-nowrap ${event.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : event.status === 'sold_out'
                    ? 'bg-red-100 text-red-800'
                    : event.status === 'draft'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-100 text-blue-800'
                }`}>
                {event.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Date:</span> {formatDate(event.start_date)} at {formatTime(event.start_date)}
            </p>

            {event.venue && (
              <p>
                <span className="font-medium">Venue:</span> {event.venue.name} - {event.venue.city}, {event.venue.state}
              </p>
            )}

            {event.primary_artist && (
              <p>
                <span className="font-medium">Artist:</span> {event.primary_artist.name}
                {event.primary_artist.genre && (
                  <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
                    {event.primary_artist.genre}
                  </span>
                )}
              </p>
            )}

            <div className="flex justify-between items-center pt-2">
              <p className="text-sm">
                <span className="font-medium">Sales:</span> {event.sold_tickets}/{event.total_capacity} sold
              </p>

              <div className="text-xs text-gray-500">
                ID: {event.id}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 flex-shrink-0">
          <Link
            href={`/events/${event.id}/edit`}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleteEventMutation.isPending}
            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleteEventMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {/* Short Description */}
      {event.short_description && (
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {event.short_description}
        </p>
      )}
    </div>
  );
}
