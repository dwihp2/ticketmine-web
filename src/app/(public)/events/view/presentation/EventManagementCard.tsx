"use client";

import type { Event } from '../../models/interfaces/event';
import Image from 'next/image';
import Link from 'next/link';
import { useDeleteEvent } from '../../usecases/useDeleteEvent';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Trash2, Edit, Copy } from 'lucide-react';
import { toast } from "sonner";

interface EventManagementCardProps {
  event: Event;
}

export function EventManagementCard({ event }: EventManagementCardProps) {
  const deleteEventMutation = useDeleteEvent();

  // Format the date for display using date-fns
  const formatDate = (date: Date) => {
    return format(date, 'EEE, MMM d, yyyy'); // "Mon, Apr 29, 2025"
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

  const handleDelete = async () => {
    try {
      await deleteEventMutation.mutateAsync(event.id);
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
  };

  const copyEventId = () => {
    navigator.clipboard.writeText(event.id.toString());
    toast.success("Event ID copied!", {
      description: `ID: ${event.id}`,
    });
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Event Image */}
          <div className="flex-shrink-0">
            <div className="relative w-30 h-20 rounded-md overflow-hidden">
              {event.image_url ? (
                <Image
                  src={event.image_url}
                  alt={event.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Event Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold truncate pr-2">{event.name}</h3>
              <div className="flex items-center gap-2">
                {event.is_featured && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs whitespace-nowrap">
                    Featured
                  </Badge>
                )}
                <Badge variant={getStatusVariant(event.status)} className="text-xs capitalize whitespace-nowrap">
                  {event.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>

            <div className="text-sm text-muted-foreground space-y-1">
              <p>
                <span className="font-medium">Date:</span> {formatDate(event.start_date)} at {formatTime(event.start_date)}
              </p>

              {event.venue && (
                <p>
                  <span className="font-medium">Venue:</span> {event.venue.name} - {event.venue.city}, {event.venue.state}
                </p>
              )}

              {event.primary_artist && (
                <p>
                  <span className="font-medium">Artist:</span> {event.primary_artist.name}
                  {event.primary_artist.genre && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      {event.primary_artist.genre}
                    </Badge>
                  )}
                </p>
              )}

              <div className="flex justify-between items-center pt-2">
                <p className="text-sm">
                  <span className="font-medium">Sales:</span> {event.sold_tickets}/{event.total_capacity} sold
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyEventId}
                  className="text-xs text-muted-foreground p-1 h-auto"
                >
                  <Copy className="w-3 h-3 mr-1" />
                  ID: {event.id}
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Button asChild variant="default" size="sm" className="px-3">
              <Link href={`/events/${event.id}/edit`}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Link>
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm" className="px-3">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Event</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete &ldquo;{event.name}&rdquo;? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteEventMutation.isPending}
                  >
                    {deleteEventMutation.isPending ? 'Deleting...' : 'Delete Event'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Short Description */}
        {event.short_description && (
          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {event.short_description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
