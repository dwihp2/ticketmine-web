export { AppSidebar } from './AppSidebar';
export { AppLayout } from './AppLayout';
export { DynamicBreadcrumb } from './DynamicBreadcrumb';
export { BreadcrumbProvider, useBreadcrumb, useSetBreadcrumbs } from './BreadcrumbContext';
export type { NavigationItem, NavigationSection } from './navigationConfig';
export {
  getNavigationForUser,
  canAccessNavigationItem,
  publicNavigation,
  authenticatedNavigation,
  organizerNavigation,
  adminNavigation,
  guestNavigation
} from './navigationConfig';
