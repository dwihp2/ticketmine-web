import { EventDiscoveryContainer } from '../view/container/EventDiscoveryContainer';

export default function DiscoverEventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EventDiscoveryContainer />
    </div>
  );
}

export const metadata = {
  title: 'Discover Events | TicketMine',
  description: 'Find amazing concerts, shows, and events happening near you. Browse by category, venue, or date to find your perfect event.',
};
