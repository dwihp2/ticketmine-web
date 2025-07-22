"use client";

import type { Event } from '../../models/interfaces/event';
import Image from 'next/image';
import Link from 'next/link';

interface EnhancedEventCardProps {
  event: Event;
  layout?: 'grid' | 'list';
  showFullDetails?: boolean;
}

export function EnhancedEventCard({ event, layout = 'grid', showFullDetails = false }: EnhancedEventCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: layout === 'list' ? 'short' : 'long',
      year: 'numeric',
      month: layout === 'list' ? 'short' : 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'sold_out':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getAvailabilityInfo = () => {
    const remaining = event.total_capacity - event.sold_tickets;
    const percentage = (event.sold_tickets / event.total_capacity) * 100;

    if (event.status === 'sold_out') {
      return { text: 'Sold Out', color: 'text-red-600' };
    } else if (percentage > 90) {
      return { text: `Only ${remaining} left!`, color: 'text-red-600' };
    } else if (percentage > 75) {
      return { text: `${remaining} tickets left`, color: 'text-orange-600' };
    } else {
      return { text: `${remaining} available`, color: 'text-green-600' };
    }
  };

  const availability = getAvailabilityInfo();

  if (layout === 'list') {
    return (
      <Link href={`/events/${event.id}`}>
        <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-all bg-white hover:scale-[1.01] cursor-pointer">
          <div className="flex gap-4">
            {/* Event Image */}
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
                {event.image_url ? (
                  <Image
                    src={event.image_url}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl">🎪</span>
                  </div>
                )}
              </div>
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg mb-1 truncate">{event.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 truncate">
                    {event.primary_artist?.name} • {event.venue?.name}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm font-medium">
                      {formatDate(event.start_date)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatTime(event.start_date)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status.replace('_', ' ').toUpperCase()}
                    </span>
                    {event.is_featured && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {event.short_description}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 ml-4">
                  <div className={`text-sm font-medium ${availability.color}`}>
                    {availability.text}
                  </div>
                  <div className="text-xs text-gray-500">
                    {event.venue?.city}, {event.venue?.state}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid layout (default)
  return (
    <Link href={`/events/${event.id}`}>
      <div className="border rounded-lg shadow-sm hover:shadow-lg transition-all bg-white hover:scale-[1.02] cursor-pointer overflow-hidden">
        {/* Event Image */}
        <div className="relative w-full h-48 md:h-56">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">🎪</span>
            </div>
          )}

          {/* Status and Featured Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
              {event.status.replace('_', ' ').toUpperCase()}
            </span>
            {event.is_featured && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Featured
              </span>
            )}
          </div>

          {/* Availability Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white ${availability.color}`}>
              {availability.text}
            </span>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-4">
          <div className="mb-3">
            <h3 className="font-bold text-lg mb-1 line-clamp-2">{event.name}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {event.primary_artist?.name}
            </p>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <span className="w-4 h-4 mr-2">📍</span>
              <span className="truncate">
                {event.venue?.name}, {event.venue?.city}, {event.venue?.state}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <span className="w-4 h-4 mr-2">📅</span>
              <span>
                {formatDate(event.start_date)} at {formatTime(event.start_date)}
              </span>
            </div>

            {event.age_restriction && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="w-4 h-4 mr-2">🔞</span>
                <span>{event.age_restriction}</span>
              </div>
            )}
          </div>

          {showFullDetails && (
            <p className="text-sm text-gray-600 line-clamp-3 mb-3">
              {event.description}
            </p>
          )}

          {!showFullDetails && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {event.short_description}
            </p>
          )}

          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {event.sold_tickets}/{event.total_capacity} sold
            </div>
            <div className="text-sm font-medium text-blue-600">
              View Details →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
