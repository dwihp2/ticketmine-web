"use client";
import { LoginForm } from '../presentation/LoginForm';

export function LoginContainer() {
  // Login functionality is now handled directly in LoginForm.tsx using Better-Auth
  // No container logic needed since Better-Auth handles authentication directly
  return <LoginForm />;
}
