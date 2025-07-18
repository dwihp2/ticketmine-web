import type { Event } from '../../models/interfaces/event';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-bold mb-2">{event.name}</h2>
      <p className="text-muted-foreground mb-1">{event.date} @ {event.time}</p>
      <p className="mb-1">Venue: {event.venue}, {event.location}</p>
      <p className="mb-1">Genre: {event.genre}</p>
      <p className="mb-1">Artist: {event.artist}</p>
      <p className="text-sm text-gray-500">{event.description}</p>
    </div>
  );
}
