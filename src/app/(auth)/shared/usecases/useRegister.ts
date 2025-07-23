import { authClient } from '@/lib/auth-client';

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface RegisterResult {
  success: boolean;
  error?: string;
}

export async function registerUser(input: RegisterInput): Promise<RegisterResult> {
  try {
    const { error: signUpError } = await authClient.signUp.email({
      email: input.email,
      password: input.password,
      name: input.name,
    });

    if (signUpError) {
      return {
        success: false,
        error: signUpError.message || "Registration failed. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("Registration error:", err);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
