import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto py-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to TicketMine</h1>
      <p className="mb-8 text-lg text-muted-foreground">Discover and book tickets for the best concerts and events!</p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
        <Link
          href="/events"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Browse Events
        </Link>

        <Link
          href="/events/manage"
          className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
        >
          Manage Events
        </Link>
      </div>

      <div className="text-sm text-gray-500">
        <p>✨ Phase 2: Event Management System is now live!</p>
        <p>Create, edit, and manage events with our comprehensive dashboard.</p>
      </div>
    </div>
  );
}
