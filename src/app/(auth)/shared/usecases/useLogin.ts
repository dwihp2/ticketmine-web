import { authClient } from '@/lib/auth-client';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}

export async function loginUser(input: LoginInput): Promise<LoginResult> {
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
