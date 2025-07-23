import { Calendar, Home, Search, Settings, Shield, Users, Plus, BarChart3, Tag } from 'lucide-react';
import type { UserRole } from '@/app/(auth)/shared/models/interfaces/user';

export interface NavigationItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  roles?: UserRole[]; // If undefined, available to all authenticated users
  requiresAuth?: boolean; // If false, available to guests
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

export const publicNavigation: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
    description: 'Back to homepage',
    requiresAuth: false,
  },
  {
    label: 'Browse Events',
    href: '/events',
    icon: Search,
    description: 'Discover amazing events',
    requiresAuth: false,
  },
  {
    label: 'Event Discovery',
    href: '/events/discover',
    icon: Calendar,
    description: 'Find events near you',
    requiresAuth: false,
  },
];

export const authenticatedNavigation: NavigationSection[] = [
  {
    title: 'Personal',
    items: [
      {
        label: 'My Profile',
        href: '/profile',
        icon: Users,
        description: 'Manage your profile',
      },
      {
        label: 'My Tickets',
        href: '/tickets',
        icon: Tag,
        description: 'View purchased tickets',
      },
      {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
        description: 'Account settings',
      },
    ],
  },
  {
    title: 'Events',
    items: [
      {
        label: 'Browse Events',
        href: '/events',
        icon: Search,
        description: 'Discover events',
      },
      {
        label: 'Event Discovery',
        href: '/events/discover',
        icon: Calendar,
        description: 'Find events near you',
      },
    ],
  },
];

export const organizerNavigation: NavigationSection[] = [
  {
    title: 'Event Management',
    items: [
      {
        label: 'My Events',
        href: '/events/manage',
        icon: Calendar,
        description: 'Manage your events',
        roles: ['admin', 'organizer'],
      },
      {
        label: 'Create Event',
        href: '/events/create',
        icon: Plus,
        description: 'Create new event',
        roles: ['admin', 'organizer'],
      },
      {
        label: 'Event Analytics',
        href: '/analytics/events',
        icon: BarChart3,
        description: 'View event analytics',
        roles: ['admin', 'organizer'],
      },
    ],
  },
];

export const adminNavigation: NavigationSection[] = [
  {
    title: 'Administration',
    items: [
      {
        label: 'Admin Panel',
        href: '/admin',
        icon: Shield,
        description: 'Site administration',
        roles: ['admin'],
      },
      {
        label: 'User Management',
        href: '/admin/users',
        icon: Users,
        description: 'Manage users',
        roles: ['admin'],
      },
      {
        label: 'Site Analytics',
        href: '/admin/analytics',
        icon: BarChart3,
        description: 'View site analytics',
        roles: ['admin'],
      },
    ],
  },
];

export const guestNavigation: NavigationItem[] = [
  {
    label: 'Sign In',
    href: '/login',
    icon: Users,
    description: 'Sign in to your account',
    requiresAuth: false,
  },
  {
    label: 'Join TicketMine',
    href: '/register',
    icon: Plus,
    description: 'Create a free account',
    requiresAuth: false,
  },
];

// Helper function to get navigation items based on user role
export function getNavigationForUser(isAuthenticated: boolean, role?: UserRole): NavigationSection[] {
  if (!isAuthenticated) {
    return [
      {
        title: 'Public',
        items: publicNavigation,
      },
      {
        title: 'Account',
        items: guestNavigation,
      },
    ];
  }

  let navigation = [...authenticatedNavigation];

  // Add organizer navigation for organizers and admins
  if (role === 'organizer' || role === 'admin') {
    navigation = [...navigation, ...organizerNavigation];
  }

  // Add admin navigation for admins
  if (role === 'admin') {
    navigation = [...navigation, ...adminNavigation];
  }

  return navigation;
}

// Helper function to check if user can access a navigation item
export function canAccessNavigationItem(item: NavigationItem, isAuthenticated: boolean, role?: UserRole): boolean {
  // Check auth requirement
  if (item.requiresAuth === false) {
    return true; // Available to everyone
  }

  if (!isAuthenticated) {
    return false; // Requires auth but user is not authenticated
  }

  // Check role requirement
  if (item.roles && item.roles.length > 0) {
    return role ? item.roles.includes(role) : false;
  }

  // Default: available to all authenticated users
  return true;
}
