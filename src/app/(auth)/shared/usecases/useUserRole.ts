'use client';

import { authClient } from '@/lib/auth-client';
import type { UserRole } from '../models/interfaces/user';
import type { ExtendedUser } from '@/lib/auth';

export function useUserRole() {
  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user as ExtendedUser | undefined;
  const isAuthenticated = !!session?.user && !isPending;

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!isAuthenticated || !currentUser || !currentUser.role) return false;

    if (Array.isArray(role)) {
      return role.includes(currentUser.role as UserRole);
    }

    return currentUser.role === role;
  };

  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  const isOrganizer = (): boolean => {
    return hasRole(['admin', 'organizer']);
  };

  const isUser = (): boolean => {
    return hasRole('user');
  };

  const canManageEvents = (): boolean => {
    return hasRole(['admin', 'organizer']);
  };

  const canAccessAdminPanel = (): boolean => {
    return hasRole('admin');
  };

  const canCreateEvents = (): boolean => {
    return hasRole(['admin', 'organizer']);
  };

  const canModerateContent = (): boolean => {
    return hasRole('admin');
  };

  return {
    role: currentUser?.role || null,
    isAuthenticated,
    hasRole,
    isAdmin,
    isOrganizer,
    isUser,
    canManageEvents,
    canAccessAdminPanel,
    canCreateEvents,
    canModerateContent,
  };
}
