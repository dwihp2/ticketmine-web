export default function RootPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to TicketMine
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your gateway to amazing events and experiences
        </p>
        <div className="space-x-4">
          <a 
            href="/login" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </a>
          <a 
            href="/dashboard" 
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}