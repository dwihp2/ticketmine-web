import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import type { FeaturedEvent } from '../../repositories/getFeaturedEvents';

interface FeaturedEventsProps {
  events: FeaturedEvent[];
  isLoading: boolean;
}

export function FeaturedEventsSection({ events, isLoading }: FeaturedEventsProps) {
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-300 rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Events</h2>
          <p className="text-gray-600 mb-8">No featured events available at the moment.</p>
          <Button asChild>
            <Link href="/events">Browse All Events</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don&apos;t miss out on these amazing events happening near you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {events.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image_url || event.banner_url || '/api/placeholder/400/300'}
                  alt={event.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {event.category && (
                  <Badge
                    className="absolute top-3 left-3"
                    style={{ backgroundColor: event.category.color || '#3b82f6' }}
                  >
                    {event.category.name}
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-3">
                <h3 className="font-bold text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {event.name}
                </h3>
                {event.primary_artist && (
                  <p className="text-sm text-gray-600">by {event.primary_artist.name}</p>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.start_date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.venue.name}, {event.venue.city}
                  </div>
                </div>

                {event.short_description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {event.short_description}
                  </p>
                )}

                <Button asChild className="w-full">
                  <Link href={`/events/${event.id}`}>
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
