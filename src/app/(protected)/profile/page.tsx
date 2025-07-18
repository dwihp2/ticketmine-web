import { UserProfileContainer } from '@/app/(auth)/shared/view/container/UserProfileContainer';

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <UserProfileContainer />
    </div>
  );
}
