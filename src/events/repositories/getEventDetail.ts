import { db } from '@db/connection';
import { events } from '@db/schema/schema';
import { eq } from 'drizzle-orm';

export async function getEventDetail(eventId: number) {
  const result = await db.select().from(events).where(eq(events.id, eventId));
  return result[0];
}
