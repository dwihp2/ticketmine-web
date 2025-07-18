import { db } from '@db/connection';
import { events } from '@db/schema/schema';
import type { EventFilters } from '../models/types/event-filters';
export interface GetEventsOptions extends EventFilters {
  limit?: number;
  offset?: number;
  sortBy?: 'id' | 'name' | 'date' | 'venue' | 'location' | 'genre' | 'artist' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}
export async function getEvents(options: GetEventsOptions = {}) {
  const filters = options;
  const { eq, ilike, and, or, asc, desc } = await import('drizzle-orm');
  const whereClauses = [];

  if (filters.date) {
    const dateValue = typeof filters.date === 'string' ? new Date(filters.date) : filters.date;
    whereClauses.push(eq(events.date, dateValue));
  }
  if (filters.location) {
    whereClauses.push(ilike(events.location, `%${filters.location}%`));
  }
  if (filters.artist) {
    whereClauses.push(ilike(events.artist, `%${filters.artist}%`));
  }
  if (filters.genre) {
    whereClauses.push(ilike(events.genre, `%${filters.genre}%`));
  }
  if (filters.venue) {
    whereClauses.push(ilike(events.venue, `%${filters.venue}%`));
  }
  if (filters.search) {
    whereClauses.push(
      or(
        ilike(events.name, `%${filters.search}%`),
        ilike(events.description, `%${filters.search}%`),
        ilike(events.artist, `%${filters.search}%`),
        ilike(events.genre, `%${filters.search}%`),
        ilike(events.venue, `%${filters.search}%`)
      )
    );
  }

  let query = db.select().from(events) as typeof query;
  if (whereClauses.length) {
    query = query.where(and(...whereClauses));
  }

  if (options.sortBy) {
    const sortColumn =
      options.sortBy === 'id' ? events.id :
        options.sortBy === 'name' ? events.name :
          options.sortBy === 'date' ? events.date :
            options.sortBy === 'venue' ? events.venue :
              options.sortBy === 'location' ? events.location :
                options.sortBy === 'genre' ? events.genre :
                  options.sortBy === 'artist' ? events.artist :
                    options.sortBy === 'created_at' ? events.created_at : undefined;
    if (sortColumn) {
      query = query.orderBy(
        options.sortOrder === 'desc' ? desc(sortColumn) : asc(sortColumn)
      );
    }
  }

  if (typeof options.limit === 'number') {
    query = query.limit(options.limit);
  }
  if (typeof options.offset === 'number') {
    query = query.offset(options.offset);
  }

  const results = await query;
  return results;
}
