export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfile extends User {
  avatarUrl: string;
  bio: string;
  location: string;
  isActive: boolean;
}

export interface CreateUserInput {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUserInput {
  id: string;
  name?: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
}
