import { db } from '@db/connection';
import { events } from '@db/schema/schema';
import type { EventFilters } from '../models/types/event-filters';

export async function getEvents(filters: EventFilters = {}) {
  // Build query with dynamic filters
  const { eq, ilike, and, or } = await import('drizzle-orm');
  const whereClauses = [];

  if (filters.date) {
    // Convert string to Date if necessary
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

  const query = whereClauses.length
    ? db.select().from(events).where(and(...whereClauses))
    : db.select().from(events);

  return query;
}
