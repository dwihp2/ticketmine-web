import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { User } from '../models/interfaces/auth';
import type { AuthStatus } from '../models/types/auth';

interface AuthStore {
  user: User | null;
  status: AuthStatus;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setStatus: (status: AuthStatus) => void;
  signOut: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      user: null,
      status: 'loading',
      isAuthenticated: false,
      
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user,
        status: user ? 'authenticated' : 'unauthenticated'
      }),
      
      setStatus: (status) => set({ status }),
      
      signOut: () => set({ 
        user: null, 
        isAuthenticated: false, 
        status: 'unauthenticated' 
      }),
      
      initialize: () => {
        const { status } = get();
        if (status === 'loading') {
          set({ status: 'unauthenticated' });
        }
      },
    }),
    {
      name: 'auth-store',
    }
  )
);