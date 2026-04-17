"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center text-center">


        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Financial Assistance Made Simple
        </h1>

        <p className="text-gray-600 mt-4 max-w-xl">
          Apply for social support in minutes. Our AI assistant helps you
          describe your situation clearly and professionally.
        </p>

        <div className="flex gap-4 mt-8">

          <Link href="/apply">
            <button className="
              bg-blue-600 text-white px-6 py-3 rounded-xl
              hover:bg-blue-700 transition
              active:scale-[0.98]
            ">
              Start Application
            </button>
          </Link>

        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 pb-20">

        {[
          {
            title: "Fast Application",
            desc: "Complete your request in minutes with guided steps."
          },
          {
            title: "AI Assistance",
            desc: "Smart writing help for your financial situation."
          },
          {
            title: "Secure System",
            desc: "Your data is encrypted and protected."
          }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {item.desc}
            </p>
          </div>
        ))}

      </section>

    </main>
  );
}