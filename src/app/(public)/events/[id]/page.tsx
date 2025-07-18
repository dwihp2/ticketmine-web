import { EventDetailContainer } from '@/app/(public)/events/view/container/EventDetailContainer';
import Link from 'next/link';

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const eventId = Number(id);
  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/events" className="text-blue-600 hover:underline">← Back to Events</Link>
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
      </div>
      <EventDetailContainer eventId={eventId} />
    </div>
  );
}
