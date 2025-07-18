"use server";
import { getUserProfile } from '../getUserProfile';

export async function getUserProfileAction(userId: string) {
  return await getUserProfile(userId);
}
