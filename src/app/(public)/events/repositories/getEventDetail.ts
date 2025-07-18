'use server';

import { db } from '@db/connection';
import { events, venues, artists } from '@db/schema/schema';
import { eq } from 'drizzle-orm';

export async function getEventDetail(eventId: number) {
  const result = await db
    .select({
      id: events.id,
      name: events.name,
      description: events.description,
      short_description: events.short_description,
      start_date: events.start_date,
      end_date: events.end_date,
      doors_open: events.doors_open,
      age_restriction: events.age_restriction,
      dress_code: events.dress_code,
      image_url: events.image_url,
      banner_url: events.banner_url,
      status: events.status,
      is_featured: events.is_featured,
      max_tickets_per_user: events.max_tickets_per_user,
      sale_start_date: events.sale_start_date,
      sale_end_date: events.sale_end_date,
      total_capacity: events.total_capacity,
      sold_tickets: events.sold_tickets,
      created_at: events.created_at,
      updated_at: events.updated_at,
      venue: {
        id: venues.id,
        name: venues.name,
        address: venues.address,
        city: venues.city,
        state: venues.state,
        country: venues.country,
        capacity: venues.capacity,
        image_url: venues.image_url,
      },
      primary_artist: {
        id: artists.id,
        name: artists.name,
        genre: artists.genre,
        image_url: artists.image_url,
      },
    })
    .from(events)
    .leftJoin(venues, eq(events.venue_id, venues.id))
    .leftJoin(artists, eq(events.primary_artist_id, artists.id))
    .where(eq(events.id, eventId));

  return result[0];
}
