import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { signInUser } from '../repositories/authRepository';
import { useAuthStore } from './useAuthStore';
import type { LoginInput } from '../models/interfaces/auth';

export function useSignIn() {
  const setStatus = useAuthStore((state) => state.setStatus);

  return useMutation({
    mutationFn: (input: LoginInput) => signInUser(input),
    onMutate: () => {
      setStatus('loading');
    },
    onSuccess: (result) => {
      if (result.success) {
        // The user will be set through the auth client session
        setStatus('authenticated');
        toast.success("Welcome back! You've been logged in successfully.");
      } else {
        setStatus('unauthenticated');
        toast.error(result.error || "Login failed. Please try again.");
      }
    },
    onError: (error) => {
      setStatus('unauthenticated');
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    },
  });
}