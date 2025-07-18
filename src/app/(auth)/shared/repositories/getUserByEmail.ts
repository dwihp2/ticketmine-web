import { db } from '@db/connection';
import { users } from '@db/schema/schema';
import { eq } from 'drizzle-orm';

export async function getUserByEmail(email: string) {
  const result = await db.select().from(users).where(eq(users.email, email));
  // convert id to string if necessary
  const formattedResult = result.map(user => ({
    ...user,
    id: user.id.toString(), // Ensure id is a string if needed
  }));
  return formattedResult[0] || null;
}