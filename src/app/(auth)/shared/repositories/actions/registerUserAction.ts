"use server";

import { CreateUserInput } from '@/app/(auth)/shared/models/interfaces/user';
import { createUser } from '../createUser';

export async function registerUserAction(input: CreateUserInput) {
  return await createUser(input);
}
