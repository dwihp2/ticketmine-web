import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../repositories/loginUser';
import { useUserStore } from './useUserStore';

export function useLogin() {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      setCurrentUser(user);
    },
  });
}
