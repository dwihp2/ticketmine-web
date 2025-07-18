import type { Event } from '../../models/interfaces/event';

interface EventDetailCardProps {
  event: Event;
}

export function EventDetailCard({ event }: EventDetailCardProps) {
  return (
    <div className="border rounded-lg p-6 shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
      <p className="text-muted-foreground mb-2">{event.date} @ {event.time}</p>
      <p className="mb-2">Venue: {event.venue}, {event.location}</p>
      <p className="mb-2">Genre: {event.genre}</p>
      <p className="mb-2">Artist: {event.artist}</p>
      <p className="text-base text-gray-700 mt-4">{event.description}</p>
      <p className="text-xs text-gray-400 mt-2">Created at: {event.created_at}</p>
    </div>
  );
}
