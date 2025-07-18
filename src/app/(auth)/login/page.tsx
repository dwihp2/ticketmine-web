import { LoginContainer } from '@/app/(auth)/shared/view/container/LoginContainer';

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <LoginContainer />
    </div>
  );
}
