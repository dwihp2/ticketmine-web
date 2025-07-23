import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CallToActionProps {
  isAuthenticated: boolean;
}

export function CallToActionSection({ isAuthenticated }: CallToActionProps) {
  if (isAuthenticated) {
    return (
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready for Your Next Event?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Explore thousands of events and discover something new today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/events/discover">
                Discover Events
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/events/manage">
                Create Event
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Thousands of Event Lovers</h2>
        <p className="text-xl mb-8 text-blue-100">
          Create your account today and never miss out on amazing events in your area.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/register">
              Get Started Free
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
            <Link href="/login">
              Sign In
            </Link>
          </Button>
        </div>
        <p className="text-sm text-blue-200 mt-4">
          Free to join • No subscription fees • Cancel anytime
        </p>
      </div>
    </section>
  );
}
