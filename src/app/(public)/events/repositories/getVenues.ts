'use server';

import { db } from '@db/connection';
import { venues } from '@db/schema/schema';

export async function getVenues() {
  try {
    const result = await db
      .select({
        id: venues.id,
        name: venues.name,
        city: venues.city,
        state: venues.state,
        capacity: venues.capacity,
      })
      .from(venues)
      .orderBy(venues.name);

    return result;
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw new Error('Failed to fetch venues');
  }
}
