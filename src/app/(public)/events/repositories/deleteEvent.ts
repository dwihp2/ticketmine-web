'use server';

import { db } from '@db/connection';
import { events } from '@db/schema/schema';
import { eq } from 'drizzle-orm';

export async function deleteEvent(eventId: number) {
  try {
    const result = await db
      .delete(events)
      .where(eq(events.id, eventId))
      .returning();

    return result[0];
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error('Failed to delete event');
  }
}
