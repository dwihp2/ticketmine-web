import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { UserProfile } from '@/app/(auth)/shared/models/interfaces/user';

interface UserStore {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  setCurrentUser: (user: UserProfile | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      setCurrentUser: (user) => set({ currentUser: user, isAuthenticated: !!user }),
      logout: () => set({ currentUser: null, isAuthenticated: false }),
    }),
    { name: 'user-store' }
  )
);
