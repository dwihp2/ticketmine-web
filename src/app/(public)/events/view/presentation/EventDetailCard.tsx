import type { Event } from '../../models/interfaces/event';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns/format';

interface EventDetailCardProps {
  event: Event;
}

export function EventDetailCard({ event }: EventDetailCardProps) {
  // Format the date for display using date-fns
  const formatDate = (date: Date) => {
    return format(date, 'EEEE, MMMM d, yyyy'); // "Monday, April 29, 2025"
  };

  const formatTime = (date: Date) => {
    return format(date, 'h:mm a'); // "5:30 PM"
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
      case 'published':
        return 'default';
      case 'sold_out':
        return 'destructive';
      case 'draft':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        {event.banner_url && (
          <div className="mb-6">
            <Image
              src={event.banner_url}
              alt={event.name}
              width={800}
              height={400}
              className="w-full h-64 object-cover rounded-md"
            />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{event.name}</h1>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xl">📅</span>
                <span className="text-lg font-medium">{formatDate(event.start_date)}</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl">⏰</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">{formatTime(event.start_date)}</span>
                  {event.doors_open && (
                    <span className="text-sm text-muted-foreground">
                      (Doors open: {formatTime(event.doors_open)})
                    </span>
                  )}
                </div>
              </div>

              {event.venue && (
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏛️</span>
                  <span className="text-lg font-medium">{event.venue.name}</span>
                </div>
              )}

              {event.venue && (
                <div className="flex items-center gap-3">
                  <span className="text-xl">📍</span>
                  <span className="text-lg">
                    {event.venue.address}, {event.venue.city}, {event.venue.state}
                  </span>
                </div>
              )}

              {event.primary_artist && (
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎤</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium">{event.primary_artist.name}</span>
                    {event.primary_artist.genre && (
                      <Badge variant="secondary" className="text-sm">
                        {event.primary_artist.genre}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="text-xl font-semibold mb-3">About This Event</h3>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          <div className="lg:w-80">
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Status:</span>
                  <Badge variant={getStatusVariant(event.status)} className="capitalize">
                    {event.status.replace('_', ' ')}
                  </Badge>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <span className="font-medium">Capacity:</span>
                  <span className="font-semibold">{event.total_capacity}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Tickets Sold:</span>
                  <span className="font-semibold">{event.sold_tickets}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="font-medium">Available:</span>
                  <span className="font-semibold text-green-600">
                    {event.total_capacity - event.sold_tickets}
                  </span>
                </div>

                {event.age_restriction && (
                  <>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Age Restriction:</span>
                      <Badge variant="outline">{event.age_restriction}</Badge>
                    </div>
                  </>
                )}

                {event.dress_code && (
                  <>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Dress Code:</span>
                      <Badge variant="outline">{event.dress_code}</Badge>
                    </div>
                  </>
                )}

                {event.is_featured && (
                  <>
                    <Separator />
                    <div className="text-center">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 px-4 py-2">
                        ⭐ Featured Event
                      </Badge>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
