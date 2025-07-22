import { EventListContainer } from './view/container/EventListContainer';
import Link from 'next/link';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Events</h1>
            <p className="text-gray-600">Discover amazing concerts and live events</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/events/discover"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Advanced Search
            </Link>
            <Link
              href="/events/manage"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Manage Events
            </Link>
          </div>
        </div>
        <EventListContainer />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Events | TicketMine',
  description: 'Browse and discover amazing events',
};
