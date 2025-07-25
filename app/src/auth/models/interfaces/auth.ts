export interface User {
  id: string;
  email?: string;
  name: string;
  image?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role?: string;
  phone?: string;
  bio?: string;
  location?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}

export interface AuthSession {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthError {
  message: string;
  code?: string;
}