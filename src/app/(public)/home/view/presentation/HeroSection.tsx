import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  isAuthenticated: boolean;
  userName?: string;
}

export function HeroSection({ isAuthenticated, userName }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          {isAuthenticated ? (
            <>Welcome back, {userName}!</>
          ) : (
            <>Discover Amazing Events</>
          )}
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
          {isAuthenticated ? (
            <>Find your next adventure with personalized event recommendations</>
          ) : (
            <>Book tickets for concerts, festivals, sports, and more in your city</>
          )}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/events">
              Browse Events
            </Link>
          </Button>

          {!isAuthenticated && (
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/register">
                Join TicketMine
              </Link>
            </Button>
          )}

          {isAuthenticated && (
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/events/manage">
                Manage Events
              </Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
