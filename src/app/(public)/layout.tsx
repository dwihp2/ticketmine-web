import { AppLayout } from '@/components/AppSidebar/AppLayout';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}
