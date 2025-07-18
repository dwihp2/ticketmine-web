"use client";
import { RegisterForm } from '../presentation/RegisterForm';
import { useUserStore } from '@/app/(auth)/shared/store/userStore';

export function RegisterContainer() {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  const handleRegister = async (email: string, name: string, password: string) => {
    // TODO: Call backend API for registration
    const data = {
      email,
      name,
      password,
    };
    // Simulate successful registration response
    console.log('Registration successful:', data);
    // For now, mock user
    setCurrentUser({
      id: '2',
      email,
      name,
      avatarUrl: '',
      bio: '',
      location: '',
      isActive: true,
      createdAt: '',
      updatedAt: '',
    });
  };

  return <RegisterForm onSubmit={handleRegister} />;
}
