import { EventListContainer } from '@/app/(public)/events/view/container/EventListContainer';
import Link from 'next/link';

export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Events</h1>
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
      </div>
      <EventListContainer />
    </div>
  );
}
