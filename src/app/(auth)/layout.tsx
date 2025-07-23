export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex min-h-screen items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
