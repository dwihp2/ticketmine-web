import { AppLayout } from '@/components/AppSidebar/AppLayout';
import { ProtectedRouteContainer } from '@app/src/auth/view/container/ProtectedRouteContainer';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRouteContainer>
      <AppLayout>
        {children}
      </AppLayout>
    </ProtectedRouteContainer>
  );
}
