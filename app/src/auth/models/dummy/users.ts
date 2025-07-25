import type { User } from '../interfaces/auth';

export const dummyUser: User = {
  id: '1',
  email: 'admin@ticketmine.com',
  name: 'Admin User',
  image: 'https://avatar.example.com/admin.jpg',
  emailVerified: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  role: 'admin',
  phone: '+1234567890',
  bio: 'System Administrator',
  location: 'San Francisco, CA',
};