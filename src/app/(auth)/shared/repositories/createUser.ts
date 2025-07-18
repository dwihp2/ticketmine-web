import { db } from '@db/connection';
import { users } from '@db/schema/schema';
import type { CreateUserInput } from '../models/interfaces/user';
import { hash } from 'bcryptjs';

export async function createUser(input: CreateUserInput) {
  const hashedPassword = await hash(input.password, 10);
  const [user] = await db.insert(users).values({
    email: input.email,
    name: input.name,
    password: hashedPassword,
  }).returning();
  return user;
}
