'use client';

import { authClient } from '@/lib/auth-client';
import { useFeaturedEvents } from '../../usecases/useFeaturedEvents';
import { HeroSection } from '../presentation/HeroSection';
import { FeaturedEventsSection } from '../presentation/FeaturedEventsSection';
import { FeaturesSection } from '../presentation/FeaturesSection';
import { CallToActionSection } from '../presentation/CallToActionSection';
import type { ExtendedUser } from '@/lib/auth';

export function HomePageContainer() {
  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user as ExtendedUser | undefined;
  const isAuthenticated = !!session?.user && !isPending;
  const { data: featuredEvents = [], isLoading } = useFeaturedEvents(6);

  return (
    <div className="min-h-screen">
      <HeroSection
        isAuthenticated={isAuthenticated}
        userName={currentUser?.name?.split(' ')[0]} // First name only
      />

      <FeaturedEventsSection
        events={featuredEvents}
        isLoading={isLoading}
      />

      {!isAuthenticated && <FeaturesSection />}

      <CallToActionSection isAuthenticated={isAuthenticated} />
    </div>
  );
}
