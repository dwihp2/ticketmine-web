import { RegisterContainer } from '@/app/(auth)/shared/view/container/RegisterContainer';

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Register</h1>
      <RegisterContainer />
    </div>
  );
}
