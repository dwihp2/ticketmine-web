import type { UserProfile } from '../models/interfaces/user';

export async function registerUser({ email, name, password }: { email: string; name: string; password: string }): Promise<UserProfile> {
  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, password }),
  });
  if (!response.ok) throw new Error('Registration failed');
  return response.json();
}
