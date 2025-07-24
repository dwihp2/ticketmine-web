'use server';

import { db } from '@db/connection';
import { events } from '@db/schema/schema';
import type { CreateEventInput } from '../models/interfaces/create-event';

export async function createEvent(input: CreateEventInput) {
  try {
    // Validate field lengths to prevent database errors
    const truncatedInput = {
      name: input.name?.substring(0, 255) || '',
      description: input.description?.substring(0, 10000) || '',
      short_description: input.short_description?.substring(0, 500) || '',
      age_restriction: input.age_restriction?.substring(0, 50) || '',
      dress_code: input.dress_code?.substring(0, 255) || '',
      image_url: input.image_url?.substring(0, 500) || '',
      banner_url: input.banner_url?.substring(0, 500) || '',
    };

    const result = await db.insert(events).values({
      name: truncatedInput.name,
      description: truncatedInput.description,
      short_description: truncatedInput.short_description,
      start_date: input.start_date,
      end_date: input.end_date,
      doors_open: input.doors_open,
      age_restriction: truncatedInput.age_restriction,
      dress_code: truncatedInput.dress_code,
      image_url: truncatedInput.image_url,
      banner_url: truncatedInput.banner_url,
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
