"use client";
import { authClient } from '@/lib/auth-client';
import { UserProfileCard } from '../presentation/UserProfileCard';
import type { ExtendedUser } from '@/lib/auth';
import type { UserProfile, UserRole } from '../../models/interfaces/user';

export function UserProfileContainer() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as ExtendedUser | undefined;

  if (isPending) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view your profile.</div>;

  // Map Better-Auth user to UserProfile interface
  const userProfile: UserProfile = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as UserRole, // Type assertion for role
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    avatarUrl: user.image || '',
    bio: user.bio || '',
    location: user.location || '',
    isActive: true, // Default to true since user is logged in
  };

  return <UserProfileCard user={userProfile} />;
}
