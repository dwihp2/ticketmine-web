'use server';

import { db } from '@db/connection';
import { events } from '@db/schema/schema';
import { eq } from 'drizzle-orm';
import type { UpdateEventInput } from '../models/interfaces/create-event';

export async function updateEvent(input: UpdateEventInput) {
  try {
    const { id, ...updateData } = input;

    const result = await db
      .update(events)
      .set({
        ...updateData,
        updated_at: new Date(),
      })
      .where(eq(events.id, id))
      .returning();

    return result[0];
  } catch (error) {
    console.error('Error updating event:', error);
    throw new Error('Failed to update event');
  }
}
