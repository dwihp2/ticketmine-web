import type { UserProfile } from '../models/interfaces/user';

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user profile');
  return response.json();
}
