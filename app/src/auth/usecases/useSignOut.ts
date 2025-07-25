import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { signOutUser } from '../repositories/authRepository';
import { useAuthStore } from './useAuthStore';

export function useSignOut() {
  const signOut = useAuthStore((state) => state.signOut);

  return useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      signOut();
      toast.success("You have been logged out successfully.");
    },
    onError: (error) => {
      toast.error("Failed to sign out. Please try again.");
      console.error("Sign out error:", error);
    },
  });
}