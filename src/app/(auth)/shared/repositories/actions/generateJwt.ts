import { User } from '@/app/(auth)/shared/models/interfaces/user';
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export function generateJwt(user: Omit<User, 'createdAt' | 'updatedAt'>): string {
  return jwt.sign({ id: user.id, email: user.email, name: user.name, }, JWT_SECRET, { expiresIn: '7d' });
}
