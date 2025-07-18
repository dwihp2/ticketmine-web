import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../repositories/registerUser';

export function useRegister() {
  return useMutation({
    mutationFn: registerUser,
  });
}
