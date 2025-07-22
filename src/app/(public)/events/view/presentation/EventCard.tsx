import type { Event } from '../../models/interfaces/event';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
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
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      {event.image_url && (
        <Image
          src={event.image_url}
          alt={event.name}
          width={400}
          height={192}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      <h2 className="text-xl font-bold mb-2">{event.name}</h2>

      <div className="space-y-2 text-sm text-muted-foreground">
        <p>
          <span className="font-medium">Date:</span> {formatDate(event.start_date)}
        </p>

        <p>
          <span className="font-medium">Time:</span> {formatTime(event.start_date)}
          {event.doors_open && (
            <span className="ml-2">(Doors: {formatTime(event.doors_open)})</span>
          )}
        </p>

        {event.venue && (
          <p>
            <span className="font-medium">Venue:</span> {event.venue.name}
          </p>
        )}

        {event.venue && (
          <p>
            <span className="font-medium">Location:</span> {event.venue.city}, {event.venue.state}
          </p>
        )}

        {event.primary_artist && (
          <p>
            <span className="font-medium">Artist:</span> {event.primary_artist.name}
          </p>
        )}

        {event.primary_artist?.genre && (
          <p>
            <span className="font-medium">Genre:</span> {event.primary_artist.genre}
          </p>
        )}
      </div>

      {event.short_description && (
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {event.short_description}
        </p>
      )}

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {event.is_featured && (
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          <span className={`text-xs px-2 py-1 rounded-full capitalize ${event.status === 'active'
              ? 'bg-green-100 text-green-800'
              : event.status === 'sold_out'
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
            {event.status.replace('_', ' ')}
          </span>
        </div>

        <div className="text-sm text-gray-500">
          {event.sold_tickets}/{event.total_capacity} sold
        </div>
      </div>
    </div>
  );
}
