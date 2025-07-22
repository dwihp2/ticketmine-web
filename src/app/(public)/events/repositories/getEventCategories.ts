'use server';

import { db } from '@db/connection';
import { eventCategories } from '@db/schema/schema';

export async function getEventCategories() {
  try {
    const result = await db
      .select({
        id: eventCategories.id,
        name: eventCategories.name,
        description: eventCategories.description,
      })
      .from(eventCategories)
      .orderBy(eventCategories.name);

    return result;
  } catch (error) {
    console.error('Error fetching event categories:', error);
    throw new Error('Failed to fetch event categories');
  }
}
