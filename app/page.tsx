import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-10 bg-white rounded-xl shadow-lg text-center space-y-4">
        
        <h1 className="text-3xl font-bold text-blue-600">
          Social Support Portal
        </h1>

        <p className="text-gray-600">
          Start your application in a few steps
        </p>

        <Link
          href="/apply"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Start Application
        </Link>

      </div>
    </main>
  );
}