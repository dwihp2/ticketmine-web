import type { UserProfile } from '../models/interfaces/user';

export async function loginUser({ email, password }: { email: string; password: string }): Promise<UserProfile> {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json();
}
