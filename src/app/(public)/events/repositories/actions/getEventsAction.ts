

import { db } from '@db/connection';
import { events, venues, artists } from '@db/schema/schema';
import type { EventFilters } from '../../models/types/event-filters';
import { eq, ilike, and, or, asc, desc, gte, lte } from 'drizzle-orm';

export interface GetEventsOptions extends EventFilters {
  limit?: number;
  offset?: number;
  sortBy?: 'id' | 'name' | 'date' | 'venue' | 'location' | 'genre' | 'artist' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}

export async function getEventsAction(options: GetEventsOptions = {}) {
  const filters = options;
  const whereClauses = [];

  if (filters.date) {
    const dateValue = typeof filters.date === 'string' ? new Date(filters.date) : filters.date;
    const startOfDay = new Date(dateValue);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dateValue);
    endOfDay.setHours(23, 59, 59, 999);
    whereClauses.push(and(
      gte(events.start_date, startOfDay),
      lte(events.start_date, endOfDay)
    ));
  }
  if (filters.location) {
    whereClauses.push(
      or(
        ilike(venues.city, `%${filters.location}%`),
        ilike(venues.state, `%${filters.location}%`),
        ilike(venues.country, `%${filters.location}%`),
        ilike(venues.address, `%${filters.location}%`)
      )
    );
  }
  if (filters.artist) {
    whereClauses.push(ilike(artists.name, `%${filters.artist}%`));
  }
  if (filters.genre) {
    whereClauses.push(ilike(artists.genre, `%${filters.genre}%`));
  }
  if (filters.venue) {
    whereClauses.push(ilike(venues.name, `%${filters.venue}%`));
  }
  if (filters.search) {
    whereClauses.push(
      or(
        ilike(events.name, `%${filters.search}%`),
        ilike(events.description, `%${filters.search}%`),
        ilike(artists.name, `%${filters.search}%`),
        ilike(artists.genre, `%${filters.search}%`),
        ilike(venues.name, `%${filters.search}%`)
      )
    );
  }

  // Build the base query
  let query = db
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
    .from((events) as typeof query)
    .leftJoin(venues, eq(events.venue_id, venues.id))
    .leftJoin(artists, eq(events.primary_artist_id, artists.id));

  // Apply where clauses
  if (whereClauses.length) {
    query = query.where(and(...whereClauses));
  }

  // Apply ordering
  if (options.sortBy) {
    const sortColumn =
      options.sortBy === 'id' ? events.id :
        options.sortBy === 'name' ? events.name :
          options.sortBy === 'date' ? events.start_date :
            options.sortBy === 'venue' ? venues.name :
              options.sortBy === 'location' ? venues.city :
                options.sortBy === 'genre' ? artists.genre :
                  options.sortBy === 'artist' ? artists.name :
                    options.sortBy === 'created_at' ? events.created_at : undefined;
    if (sortColumn) {
      query = query.orderBy(
        options.sortOrder === 'desc' ? desc(sortColumn) : asc(sortColumn)
      );
    }
  }

  // Apply pagination
  if (typeof options.limit === 'number') {
    query = query.limit(options.limit);
  }
  if (typeof options.offset === 'number') {
    query = query.offset(options.offset);
  }

  const results = await query;
  return results;
}
