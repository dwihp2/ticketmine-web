import type { UserProfile } from '../../models/interfaces/user';

export function UserProfileCard({ user }: { user: UserProfile }) {
  return (
    <div className="border rounded-lg p-6 shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="mb-2">Email: {user.email}</p>
      <p className="mb-2">Location: {user.location}</p>
      <p className="mb-2">Bio: {user.bio}</p>
      <p className="mb-2">Status: {user.isActive ? "Active" : "Inactive"}</p>
    </div>
  );
}
