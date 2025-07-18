"use client";
import { LoginForm } from '../presentation/LoginForm';
import { useUserStore } from '@/app/(auth)/shared/store/userStore';

export function LoginContainer() {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const handleLogin = async (email: string, password: string) => {
    // TODO: Call backend API for login
    const data = {
      email,
      password,
    };
    // Simulate successful login response
    console.log('Login successful:', data);
    // For now, mock user
    setCurrentUser({
      id: '1',
      email,
      name: 'Demo User',
      avatarUrl: '',
      bio: '',
      location: '',
      isActive: true,
      createdAt: '',
      updatedAt: '',
    });
  };

  return <LoginForm onSubmit={handleLogin} />;
}
