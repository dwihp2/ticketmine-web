import { NextRequest, NextResponse } from 'next/server';
import { db } from '@db/connection';
import { events } from '@db/schema/schema';

export async function GET(req: NextRequest, { params }) {
  const eventId = Number(params.id);
  if (isNaN(eventId)) {
    return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
  }
  const { eq } = await import('drizzle-orm');
  const result = await db.select().from(events).where(eq(events.id, eventId));
  if (!result.length) {
    return NextResponse.json({ error: 'Event not found' }, { status: 404 });
  }
  return NextResponse.json(result[0]);
}
