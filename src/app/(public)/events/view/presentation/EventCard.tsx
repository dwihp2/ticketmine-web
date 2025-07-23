"use client";

import type { Event } from '../../models/interfaces/event';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns/format';

/**
 * Unified EventCard component that supports multiple layouts and features
 * 
 * This component combines the functionality of the previous EventCard and EnhancedEventCard
 * components into a single, flexible component using shadcn/ui components.
 * 
 * @param event - The event object to display
 * @param layout - Display layout: 'grid' (default), 'list', or 'basic'
 * @param showFullDetails - Whether to show full description instead of short description
 * 
 * Layout Types:
 * - 'grid': Enhanced card with image overlay, badges, and navigation (default)
 * - 'list': Horizontal layout with compact information
 * - 'basic': Simple card without navigation, good for display-only purposes
 */
interface EventCardProps {
  event: Event;
  layout?: 'grid' | 'list' | 'basic';
  showFullDetails?: boolean;
}

export function EventCard({ event, layout = 'grid', showFullDetails = false }: EventCardProps) {
  const formatDate = (date: Date) => {
    if (layout === 'list') {
      return format(date, 'EEE, MMM d, yyyy'); // "Mon, Apr 29, 2025"
    }
    return format(date, 'EEEE, MMMM d, yyyy'); // "Monday, April 29, 2025"
  };

  const formatTime = (date: Date) => {
    return format(date, 'h:mm a'); // "5:30 PM"
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
        return 'default'; // Green
      case 'sold_out':
        return 'destructive'; // Red
      case 'draft':
        return 'secondary'; // Gray
      case 'cancelled':
        return 'destructive'; // Red
      default:
        return 'outline'; // Blue
    }
  };

  const getAvailabilityInfo = () => {
    const remaining = event.total_capacity - event.sold_tickets;
    const percentage = (event.sold_tickets / event.total_capacity) * 100;

    if (event.status === 'sold_out') {
      return { text: 'Sold Out', variant: 'destructive' as const };
    } else if (percentage > 90) {
      return { text: `Only ${remaining} left!`, variant: 'destructive' as const };
    } else if (percentage > 75) {
      return { text: `${remaining} tickets left`, variant: 'outline' as const };
    } else {
      return { text: `${remaining} available`, variant: 'default' as const };
    }
  };

  const availability = getAvailabilityInfo();

  // Basic layout (simple card without navigation)
  if (layout === 'basic') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          {event.image_url && (
            <Image
              src={event.image_url}
              alt={event.name}
              width={400}
              height={192}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}

          <h2 className="text-xl font-bold mb-2">{event.name}</h2>

          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <span className="font-medium">Date:</span> {formatDate(event.start_date)}
            </p>

            <p>
              <span className="font-medium">Time:</span> {formatTime(event.start_date)}
              {event.doors_open && (
                <span className="ml-2">(Doors: {formatTime(event.doors_open)})</span>
              )}
            </p>

            {event.venue && (
              <p>
                <span className="font-medium">Venue:</span> {event.venue.name}
              </p>
            )}

            {event.venue && (
              <p>
                <span className="font-medium">Location:</span> {event.venue.city}, {event.venue.state}
              </p>
            )}

            {event.primary_artist && (
              <p>
                <span className="font-medium">Artist:</span> {event.primary_artist.name}
              </p>
            )}

            {event.primary_artist?.genre && (
              <p>
                <span className="font-medium">Genre:</span> {event.primary_artist.genre}
              </p>
            )}
          </div>

          {event.short_description && (
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
              {event.short_description}
            </p>
          )}
        </CardContent>

        <CardFooter className="pt-0 px-4 pb-4">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-2">
              {event.is_featured && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  Featured
                </Badge>
              )}
              <Badge variant={getStatusVariant(event.status)} className="capitalize">
                {event.status.replace('_', ' ')}
              </Badge>
            </div>

            <div className="text-sm text-muted-foreground">
              {event.sold_tickets}/{event.total_capacity} sold
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  }

  // List layout
  if (layout === 'list') {
    return (
      <Link href={`/events/${event.id}`}>
        <Card className="hover:shadow-md transition-all hover:scale-[1.01] cursor-pointer">
          <CardContent className="p-4">
            <div className="flex gap-4">
              {/* Event Image */}
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
                  {event.image_url ? (
                    <Image
                      src={event.image_url}
                      alt={event.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-2xl">🎪</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Event Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-1 truncate">{event.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 truncate">
                      {event.primary_artist?.name} • {event.venue?.name}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm font-medium">
                        {formatDate(event.start_date)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {formatTime(event.start_date)}
                      </span>
                      <Badge variant={getStatusVariant(event.status)} className="text-xs">
                        {event.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      {event.is_featured && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {event.short_description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 ml-4">
                    <Badge variant={availability.variant} className="text-sm">
                      {availability.text}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      {event.venue?.city}, {event.venue?.state}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  // Grid layout (default)
  return (
    <Link href={`/events/${event.id}`}>
      <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer overflow-hidden">
        {/* Event Image */}
        <div className="relative w-full h-48 md:h-56">
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-4xl">🎪</span>
            </div>
          )}

          {/* Status and Featured Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge variant={getStatusVariant(event.status)} className="text-xs">
              {event.status.replace('_', ' ').toUpperCase()}
            </Badge>
            {event.is_featured && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                Featured
              </Badge>
            )}
          </div>

          {/* Availability Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant={availability.variant} className="text-xs bg-white">
              {availability.text}
            </Badge>
          </div>
        </div>

        {/* Event Details */}
        <CardContent className="p-4">
          <div className="mb-3">
            <h3 className="font-bold text-lg mb-1 line-clamp-2">{event.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {event.primary_artist?.name}
            </p>
          </div>

          <div className="space-y-2 mb-3">
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="w-4 h-4 mr-2">📍</span>
              <span className="truncate">
                {event.venue?.name}, {event.venue?.city}, {event.venue?.state}
              </span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <span className="w-4 h-4 mr-2">📅</span>
              <span>
                {formatDate(event.start_date)} at {formatTime(event.start_date)}
              </span>
            </div>

            {event.age_restriction && (
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="w-4 h-4 mr-2">🔞</span>
                <span>{event.age_restriction}</span>
              </div>
            )}
          </div>

          {showFullDetails && (
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
              {event.description}
            </p>
          )}

          {!showFullDetails && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {event.short_description}
            </p>
          )}
        </CardContent>

        <CardFooter className="pt-0 px-4 pb-4">
          <div className="w-full flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              {event.sold_tickets}/{event.total_capacity} sold
            </div>
            <Button variant="ghost" size="sm" className="text-primary p-0 h-auto">
              View Details →
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
