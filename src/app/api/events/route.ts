import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/connection';
import { events } from '@db/schema/schema';

export async function GET(_req: NextRequest) {
  // Example: fetch all events
  const allEvents = await db.select().from(events);
  return NextResponse.json(allEvents);
}

// You can add POST, PUT, DELETE handlers here for event creation, update, delete
