import { authClient } from '@/lib/auth-client';
import type { LoginInput, LoginResult } from '../models/interfaces/auth';

export async function signInUser(input: LoginInput): Promise<LoginResult> {
  try {
    const { error: signInError } = await authClient.signIn.email({
      email: input.email,
      password: input.password,
    });

    if (signInError) {
      return {
        success: false,
        error: signInError.message || "Invalid credentials. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await authClient.signOut();
  } catch (err) {
    console.error("Sign out error:", err);
    throw new Error("Failed to sign out");
  }
}

export async function getCurrentUser() {
  try {
    const session = await authClient.getSession();
    return session?.data?.user || null;
  } catch (err) {
    console.error("Get current user error:", err);
    return null;
  }
}