'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadcrumb } from './BreadcrumbContext';

interface BreadcrumbConfig {
  [key: string]: {
    label: string;
    href?: string;
  };
}

const breadcrumbConfig: BreadcrumbConfig = {
  // Root paths
  '/': { label: 'Home' },
  '/events': { label: 'Events', href: '/events' },
  '/profile': { label: 'Profile', href: '/profile' },
  '/login': { label: 'Sign In' },
  '/register': { label: 'Join TicketMine' },
  '/settings': { label: 'Settings' },
  '/tickets': { label: 'My Tickets' },

  // Event paths
  '/events/discover': { label: 'Discover Events' },
  '/events/manage': { label: 'Manage Events' },
  '/events/create': { label: 'Create Event' },

  // Admin paths
  '/admin': { label: 'Administration', href: '/admin' },
  '/admin/users': { label: 'User Management' },
  '/admin/analytics': { label: 'Site Analytics' },

  // Analytics paths
  '/analytics': { label: 'Analytics', href: '/analytics' },
  '/analytics/events': { label: 'Event Analytics' },
};

interface DynamicBreadcrumbProps {
  customItems?: Array<{ label: string; href?: string }>;
}

export function DynamicBreadcrumb({ customItems }: DynamicBreadcrumbProps) {
  const pathname = usePathname();
  const { customBreadcrumbs } = useBreadcrumb();

  // Priority: custom context breadcrumbs > prop customItems > generated from pathname
  const breadcrumbItems = customBreadcrumbs || customItems || generateBreadcrumbItems(pathname);

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumb for root pages
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            {index === breadcrumbItems.length - 1 ? (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            ) : (
              <>
                <BreadcrumbLink href={item.href || '/'}>
                  {item.label}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function generateBreadcrumbItems(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ label: 'Home', href: '/' }];

  let currentPath = '';

  for (const segment of segments) {
    currentPath += `/${segment}`;

    // Check if this is a dynamic route (e.g., /events/123)
    if (isNumeric(segment)) {
      // For dynamic routes, we'll use a generic label
      const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
      const parentConfig = breadcrumbConfig[parentPath];

      if (parentConfig) {
        items.push({
          label: `${parentConfig.label} Details`,
          href: currentPath,
        });
      }
    } else {
      // Static route
      const config = breadcrumbConfig[currentPath];
      if (config) {
        items.push({
          label: config.label,
          href: config.href || currentPath,
        });
      } else {
        // Fallback: capitalize the segment
        items.push({
          label: capitalizeFirst(segment),
          href: currentPath,
        });
      }
    }
  }

  return items;
}

function isNumeric(str: string): boolean {
  return /^\d+$/.test(str);
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
