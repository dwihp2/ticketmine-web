import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto py-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to TicketMine</h1>
      <p className="mb-8 text-lg text-muted-foreground">Discover and book tickets for the best concerts and events!</p>
      <Link href="/events" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition mb-10">Browse Events</Link>
    </div>
  );
}
