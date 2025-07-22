'use server';

import { db } from '@db/connection';
import { artists } from '@db/schema/schema';

export async function getArtists() {
  try {
    const result = await db
      .select({
        id: artists.id,
        name: artists.name,
        genre: artists.genre,
      })
      .from(artists)
      .orderBy(artists.name);

    return result;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw new Error('Failed to fetch artists');
  }
}
