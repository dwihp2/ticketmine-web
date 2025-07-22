'use server';

import { db } from '@db/connection';
import { events } from '@db/schema/schema';
import type { CreateEventInput } from '../models/interfaces/create-event';

export async function createEvent(input: CreateEventInput) {
  try {
    const result = await db.insert(events).values({
      name: input.name,
      description: input.description,
      short_description: input.short_description,
      start_date: input.start_date,
      end_date: input.end_date,
      doors_open: input.doors_open,
      age_restriction: input.age_restriction,
      dress_code: input.dress_code,
      image_url: input.image_url,
      banner_url: input.banner_url,
      status: 'draft', // New events start as draft
      is_featured: input.is_featured,
      max_tickets_per_user: input.max_tickets_per_user,
      sale_start_date: input.sale_start_date,
      sale_end_date: input.sale_end_date,
      total_capacity: input.total_capacity,
      sold_tickets: 0, // Initialize to 0
      venue_id: input.venue_id,
      primary_artist_id: input.primary_artist_id,
      category_id: input.category_id,
      created_at: new Date(),
      updated_at: new Date(),
    }).returning();

    return result[0];
  } catch (error) {
    console.error('Error creating event:', error);
    throw new Error('Failed to create event');
  }
}
