"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">

      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-bold text-lg text-blue-600">
            Social Support Portal
          </h1>

          <Link href="/apply">
            <span className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
              Apply Now
            </span>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="flex-1 flex items-center justify-center text-center px-4">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-bold">
            Financial Assistance Application
          </h2>

          <p className="text-gray-600">
            Apply for financial support easily and securely. Our system helps
            you describe your situation with AI assistance.
          </p>

          <Link href="/apply">
            <span className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer">
              Start Application
            </span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t mt-10">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500 flex flex-col md:flex-row justify-between gap-2">
          <p>© 2026 Social Support Portal</p>

          <div className="flex gap-4">
            <span className="cursor-pointer">Privacy Policy</span>
            <span className="cursor-pointer">Terms</span>
            <span className="cursor-pointer">Accessibility</span>
          </div>
        </div>
      </footer>

    </main>
  );
}