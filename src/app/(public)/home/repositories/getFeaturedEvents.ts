'use server';

import { db } from '@db/connection';
import { events, venues, artists, eventCategories } from '@db/schema/schema';
import { eq, and, desc, gte } from 'drizzle-orm';

export interface FeaturedEvent {
  id: number;
  name: string;
  description: string;
  short_description: string;
  start_date: Date;
  end_date: Date | null;
  image_url: string | null;
  banner_url: string | null;
  status: string;
  is_featured: boolean;
  venue: {
    id: number;
    name: string;
    city: string;
    state: string | null;
    country: string;
    address: string;
  };
  category: {
    id: number;
    name: string;
    color: string | null;
    icon: string | null;
  } | null;
  primary_artist: {
    id: number;
    name: string;
    genre: string | null;
    image_url: string | null;
  } | null;
}

export async function getFeaturedEvents(limit: number = 6): Promise<FeaturedEvent[]> {
  try {
    const now = new Date();

    const result = await db
      .select({
        id: events.id,
        name: events.name,
        description: events.description,
        short_description: events.short_description,
        start_date: events.start_date,
        end_date: events.end_date,
        image_url: events.image_url,
        banner_url: events.banner_url,
        status: events.status,
        is_featured: events.is_featured,
        venue: {
          id: venues.id,
          name: venues.name,
          city: venues.city,
          state: venues.state,
          country: venues.country,
          address: venues.address,
        },
        category: {
          id: eventCategories.id,
          name: eventCategories.name,
          color: eventCategories.color,
          icon: eventCategories.icon,
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
      .leftJoin(eventCategories, eq(events.category_id, eventCategories.id))
      .leftJoin(artists, eq(events.primary_artist_id, artists.id))
      .where(
        and(
          eq(events.is_featured, true),
          eq(events.status, 'published'),
          gte(events.start_date, now)
        )
      )
      .orderBy(desc(events.start_date))
      .limit(limit);

    return result.map(row => ({
      ...row,
      venue: row.venue!,
      category: row.category,
      primary_artist: row.primary_artist,
    })) as FeaturedEvent[];
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }
}
