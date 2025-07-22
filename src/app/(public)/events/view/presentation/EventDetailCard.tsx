import type { Event } from '../../models/interfaces/event';
import Image from 'next/image';

interface EventDetailCardProps {
  event: Event;
}

export function EventDetailCard({ event }: EventDetailCardProps) {
  // Format the date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white">
      {event.banner_url && (
        <Image
          src={event.banner_url}
          alt={event.name}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{event.name}</h1>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">📅</span>
              <span className="text-lg">{formatDate(event.start_date)}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">⏰</span>
              <span className="text-lg">{formatTime(event.start_date)}</span>
              {event.doors_open && (
                <span className="text-sm text-gray-600 ml-2">
                  (Doors open: {formatTime(event.doors_open)})
                </span>
              )}
            </div>

            {event.venue && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">🏛️</span>
                <span className="text-lg">{event.venue.name}</span>
              </div>
            )}

            {event.venue && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">📍</span>
                <span className="text-lg">
                  {event.venue.address}, {event.venue.city}, {event.venue.state}
                </span>
              </div>
            )}

            {event.primary_artist && (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">🎤</span>
                <span className="text-lg">{event.primary_artist.name}</span>
                {event.primary_artist.genre && (
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded-full ml-2">
                    {event.primary_artist.genre}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-3">About This Event</h3>
            <p className="text-gray-700 leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>

        <div className="lg:w-80">
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Status:</span>
              <span className={`px-3 py-1 rounded-full text-sm capitalize ${event.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : event.status === 'sold_out'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                {event.status.replace('_', ' ')}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold">Capacity:</span>
              <span>{event.total_capacity}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold">Tickets Sold:</span>
              <span>{event.sold_tickets}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold">Available:</span>
              <span>{event.total_capacity - event.sold_tickets}</span>
            </div>

            {event.age_restriction && (
              <div className="flex justify-between items-center">
                <span className="font-semibold">Age Restriction:</span>
                <span>{event.age_restriction}</span>
              </div>
            )}

            {event.dress_code && (
              <div className="flex justify-between items-center">
                <span className="font-semibold">Dress Code:</span>
                <span>{event.dress_code}</span>
              </div>
            )}

            {event.is_featured && (
              <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-center font-semibold">
                ⭐ Featured Event
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
