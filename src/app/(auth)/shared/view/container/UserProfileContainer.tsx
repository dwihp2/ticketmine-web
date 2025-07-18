"use client";
import { useUserStore } from '@/app/(auth)/shared/store/userStore';
import { UserProfileCard } from '../presentation/UserProfileCard';

export function UserProfileContainer() {
  const user = useUserStore((state) => state.currentUser);
  if (!user) return <div>Please log in to view your profile.</div>;
  return <UserProfileCard user={user} />;
}
